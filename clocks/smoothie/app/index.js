import clock from 'clock'
import document from 'document'
import * as messaging from 'messaging'
import * as fs from 'fs'
import { me } from 'appbit'
import { battery } from 'power'
import { HeartRateSensor } from 'heart-rate'
import { units } from 'user-settings'
import { today } from 'user-activity'
import { display } from 'display'

const SETTINGS_TYPE = 'cbor'
const SETTINGS_FILE = 'settings.cbor'

const defaultSettings = {
	bgColor: 'black',
	numberColor: '#CFD8DC',
	secLineColor: '#FFEBEE',
	minLineColor: '#B0BEC5',
	hourLineColor: '#CFD8DC',
	timeTxtColor: '#78909C',
	dateTxtColor: '#78909C',
	signColor: '#78909C',
	statTxtColor: '#78909C',
	statIconColor: '#311B92',
	centerColor: '#F44336',
	tickQuartColor: '#F44336',
	tickFiveColor: '#F44336',
	numberSize: 24,
	timeTxtSize: 26,
	dateTxtSize: 26,
	signSize: 20,
	statTxtSize: 20,
	secLineStroke: 1,
	minLineStroke: 4,
	hourLineStroke: 5,
	tickQuartStroke: 2,
	tickFiveStroke: 2,
	secondHandShow: true,
	signVal: { name: 'Smoothie' },
	numberWeight: { values: [ { value: 1 } ] },
	timeTxtWeight: { values: [ { value: 1 } ] },
	dateTxtWeight: { values: [ { value: 1 } ] },
	signWeight: { values: [ { value: 1 } ] },
	statTxtWeight: { values: [ { value: 1 } ] },
	statSections: {selected: [0, 1, 2, 3, 4] },
}

const hrm = new HeartRateSensor()
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const hourHand = $('hourHand')
const minHand = $('minHand')
const secondHand = $('secondHand')
const date = $('date')
const time = $('time')
const distance = $('distance')
const steps = $('steps')
const calories = $('calories')
const heart = $('heart')

let dateSections = [ 0, 1, 2, 3 ]
let dist = 0
let dt = ''
let settings = {}

function $( i ) {
	return document.getElementById( i )
}

function loadSettings() {
	try {
		const savedSettings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE)
		settings = { ...defaultSettings, ...savedSettings }
	} catch (ex) {
		settings = { ...defaultSettings }
	}
}

loadSettings()

function applyStyle( elms, styl, val ) {
	if ( ! val ) return
	elms.forEach( elm => {
		if ( styl === 'Color' ){
			elm.style.fill = val
		} else if ( styl === 'Size' ) {
			const old = `${ elm.text }`
			elm.style.fontSize = val
			elm.text = old
		} else if ( styl === 'Weight' ) {
			elm.style.fontWeight = val
		} else if ( styl === 'Display' ){
			elm.style.display = val
		} else if ( styl === 'Stroke' ){
			elm.style.strokeWidth = val
		}
	} )
}

function endsWith( str, end ) {
	return str.indexOf( end, str.length - end.length ) !== -1
}

function getSelector( attr ) {
	const el = $( attr )
	if ( el ) {
		return [ el ]
	} else {
		const elms = document.getElementsByClassName( attr )
		return elms
	}
}

function toggleStats( sections ) {
	const stats = [ 'statBat', 'statHeart', 'statDist', 'statSteps', 'statCal' ]
	for (let i = 0; i < stats.length; i++) {
		const thisEl = $( stats[i] )
		if ( sections.indexOf( i ) !== -1 ) {
			thisEl.style.display = 'inline'
		} else {
			thisEl.style.display = 'none'
		}
	}
}

function applySetting( settingKey ) {
	if ( endsWith( settingKey, 'Color' ) ) {
		const elms = getSelector( settingKey.split( 'Color' )[0] )
		applyStyle( elms, 'Color', settings[ settingKey ] )
	} else if ( endsWith( settingKey, 'Size' ) ) {
		const elms = getSelector( settingKey.split( 'Size' )[0] )
		applyStyle( elms, 'Size', settings[ settingKey ] )
	} else if ( endsWith( settingKey, 'Weight' ) ) {
		const elms = getSelector( settingKey.split( 'Weight' )[0] )
		applyStyle( elms, 'Weight', settings[ settingKey ].values[ 0 ].value )
	} else if ( endsWith( settingKey, 'Show' ) ) {
		const elms = getSelector( settingKey.split( 'Show' )[0] )
		applyStyle( elms, 'Display', settings[ settingKey ] ? 'inline' : 'none' )
	} else if ( endsWith( settingKey, 'Stroke' ) ) {
		const elms = getSelector( settingKey.split( 'Stroke' )[0] )
		applyStyle( elms, 'Stroke', settings[ settingKey ] )
	} else if ( settingKey === 'dateSections' ) {
		dateSections = settings[ settingKey ].selected
		dateSections.sort()
	} else if ( settingKey === 'statSections' ) {
		toggleStats( settings[ settingKey ].selected )
	} else if ( endsWith( settingKey, 'Val' ) ) {
		const el = $( settingKey.split( 'Val' )[0] )
		if ( el ) el.text = settings[ settingKey ].name
	}
}

function applyAllSettings() {
	for ( const prop in settings ) {
		applySetting( prop )
	}
}

applyAllSettings()

function saveSettings() {
	try {
		fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE)
	} catch (ex) {}
}

function removeSettings() {
	try {
		fs.unlinkSync(SETTINGS_FILE, SETTINGS_TYPE)
	} catch (ex) {}
}

messaging.peerSocket.onmessage = evt => {
	if ( evt.data.key && evt.data.key === 'reset' ) {
		settings = { ...defaultSettings }
		removeSettings()
		applyAllSettings()
	} else if (evt.data.newValue) {
		settings[ evt.data.key ] = JSON.parse( evt.data.newValue )
		applySetting( evt.data.key )
		saveSettings()
	}
}

me.addEventListener( 'unload', saveSettings )

function getTime( d ) {
	let h = d.getHours()
	let m = d.getMinutes()
	m = m < 10 ? `0${ m }` : m
	const n = h >= 12 ? 'PM' : 'AM'
	h = ( h % 12 ) ? ( h % 12 ) : 12
	return [ `${ h }:${ m }`, n ]
}

/*
 * Clock event handling
 */
clock.granularity = 'seconds'
clock.ontick = (evt) => {
	hourHand.groupTransform.rotate.angle = (30 * (evt.date.getHours() % 12)) + (0.5 * evt.date.getMinutes())
	minHand.groupTransform.rotate.angle = (6 * evt.date.getMinutes()) + (0.1 * evt.date.getSeconds())
	secondHand.groupTransform.rotate.angle = ( 6 * evt.date.getSeconds() )
	const dateAll = [
		days[evt.date.getDay()],
		evt.date.getDate(),
		mons[evt.date.getMonth()],
		evt.date.getFullYear().toString().slice( -2 )
	]
	dt = ''
	dateSections.forEach( sec => {
		dt = `${ dt }${ dt ? ' ' : '' }${ dateAll[ sec ] }`
	} )
	date.text = dt

	const now = getTime(evt.date)
	time.text = `${ now[ 0 ] } ${ now[ 1 ] }`

	dist = (units.distance === "metric" ? today.adjusted.distance * 0.001 : today.adjusted.distance * 0.000621371)
	distance.text = Math.floor(dist * 100) / 100
	steps.text = today.adjusted.steps
	calories.text = today.adjusted.calories
}

battery.onchange = (charger, evt) => {
	$( 'bat' ).text = `${ battery.chargeLevel }%`
}

hrm.addEventListener( 'reading', () => {
	heart.text = hrm.heartRate
} )
hrm.start()

display.addEventListener( 'change', () => {
	display.on ? hrm.start() : hrm.stop();
} )

$( 'tap' ).onclick = () => {
	const hands = $( 'hands' )
	hands.style.display = 'none'
	setTimeout(() => {
		hands.style.display = 'inline'
	}, 2000);
}
