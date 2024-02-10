function smoothieSettings( props ) {
	const allColors = [
		{ color: 'white' },
		{ color: 'black' },
		{ color: '#263238' },
		{ color: '#424242' },
		{ color: '#3E2723' },
		{ color: '#1B5E20' },
		{ color: '#33691E' },
		{ color: '#827717' },
		{ color: '#004D40' },
		{ color: '#0D47A1' },
		{ color: '#311B92' },
		{ color: '#880E4F' },
		{ color: '#FFF3E0' },
		{ color: '#FFFDE7' },
		{ color: '#F1F8E9' },
		{ color: '#E1F5FE' },
		{ color: '#EDE7F6' },
		{ color: '#FFEBEE' },
		{ color: '#FF5722' },
		{ color: '#FDD835' },
		{ color: '#8BC34A' },
		{ color: '#03A9F4' },
		{ color: '#7E57C2' },
		{ color: '#F44336' },
		{ color: '#ECEFF1' },
		{ color: '#CFD8DC' },
		{ color: '#B0BEC5' },
		{ color: '#78909C' },
	]

	return (
		<Page>
			<Section title={<Text bold align="center">Background Color</Text>}>
				<ColorSelect
					settingsKey="bgColor"
					colors={ allColors }
				/>
			</Section>
			<Section
				title={<Text bold align="center">Number Color</Text>}>
				<ColorSelect
					settingsKey="numberColor"
					colors={ allColors }
				/>
				<Slider
					label="Number Size"
					settingsKey="numberSize"
					min="18"
					max="30"
				/>
				<Select
					label={`Number Weight`}
					settingsKey='numberWeight'
					options={[
						{ name: 'Light', value: 'light' },
						{ name: 'Regular', value: 'regular' },
						{ name: 'Bold', value: 'bold' },
					]}
				/>
			</Section>
			<Section
				title={<Text bold align="center">Second Hand Color</Text>}>
				<ColorSelect
					settingsKey="secLineColor"
					colors={ allColors }
				/>
				<Toggle
					settingsKey="secondHandShow"
					label="Show Second Hand"
				/>
				<Slider
					label="Second Hand Width"
					settingsKey="secLineStroke"
					min="1"
					max="10"
				/>
			</Section>
			<Section
				title={<Text bold align="center">Minute Hand Color</Text>}>
				<ColorSelect
					settingsKey="minLineColor"
					colors={ allColors }
				/>
				<Slider
					label="Minute Hand Width"
					settingsKey="minLineStroke"
					min="1"
					max="10"
				/>
			</Section>
			<Section
				title={<Text bold align="center">Hour Hand Color</Text>}>
				<ColorSelect
					settingsKey="hourLineColor"
					colors={ allColors }
				/>
				<Slider
					label="Hour Hand Width"
					settingsKey="hourLineStroke"
					min="1"
					max="10"
				/>
			</Section>
			<Section
				title={<Text bold align="center">Time Text Color</Text>}>
				<ColorSelect
					settingsKey="timeTxtColor"
					colors={ allColors }
				/>
				<Slider
					label="Time Text Size"
					settingsKey="timeTxtSize"
					min="18"
					max="30"
				/>
				<Select
					label={`Time Text Weight`}
					settingsKey='timeTxtWeight'
					options={[
						{ name: 'Light', value: 'light' },
						{ name: 'Regular', value: 'regular' },
						{ name: 'Bold', value: 'bold' },
					]}
				/>
			</Section>
			<Section
				title={<Text bold align="center">Date Text Color</Text>}>
				<ColorSelect
					settingsKey="dateTxtColor"
					colors={ allColors }
				/>
				<Select
					label={`Date Text Sections`}
					multiple
					settingsKey='dateSections'
					options={[
						{ name: 'Day' },
						{ name: 'Date' },
						{ name: 'Month' },
						{ name: 'Year' },
					]}
				/>
				<Slider
					label="Date Text Size"
					settingsKey="dateTxtSize"
					min="18"
					max="30"
				/>
				<Select
					label={`Date Text Weight`}
					settingsKey='dateTxtWeight'
					options={[
						{ name: 'Light', value: 'light' },
						{ name: 'Regular', value: 'regular' },
						{ name: 'Bold', value: 'bold' },
					]}
				/>
			</Section>
			<Section
				title={<Text bold align="center">Sign Text</Text>}>
				<ColorSelect
					settingsKey="signColor"
					colors={ allColors }
				/>
				<TextInput
					label="Sign Text Content"
					settingsKey="signVal"
				/>
				<Slider
					label="Sign Text Size"
					settingsKey="signSize"
					min="14"
					max="30"
				/>
				<Select
					label={`Sign Text Weight`}
					settingsKey='signWeight'
					options={[
						{ name: 'Light', value: 'light' },
						{ name: 'Regular', value: 'regular' },
						{ name: 'Bold', value: 'bold' },
					]}
				/>
			</Section>
			<Section
				title={<Text bold align="center">Stats Color</Text>}>
				<ColorSelect
					settingsKey="statTxtColor"
					colors={ allColors }
				/>
				<Slider
					label="Stats Text Size"
					settingsKey="statTxtSize"
					min="14"
					max="26"
				/>
				<Select
					label={`Stats Text Weight`}
					settingsKey='statTxtWeight'
					options={[
						{ name: 'Light', value: 'light' },
						{ name: 'Regular', value: 'regular' },
						{ name: 'Bold', value: 'bold' },
					]}
				/>
				<Select
					label={`Stats Sections`}
					multiple
					settingsKey='statSections'
					options={[
						{ name: 'Battery' },
						{ name: 'Heart Rate' },
						{ name: 'Distance' },
						{ name: 'Steps' },
						{ name: 'Calories' },
					]}
				/>
			</Section>
			<Section
				title={<Text bold align="center">Stats Icon Color</Text>}>
				<ColorSelect
					settingsKey="statIconColor"
					colors={ allColors }
				/>
				<Toggle
					settingsKey="statIconShow"
					label="Show Stats Icons"
				/>
			</Section>
			<Section
				title={<Text bold align="center">Center Dot Color</Text>}>
				<ColorSelect
					settingsKey="centerColor"
					colors={allColors}
				/>
			</Section>
			<Section
				title={<Text bold align="center">Fifteen Tick Color</Text>}>
				<ColorSelect
					settingsKey="tickQuartColor"
					colors={allColors}
				/>
				<Slider
					label="Fifteen Tick Width"
					settingsKey="tickQuartStroke"
					min="1"
					max="10"
				/>
			</Section>
			<Section
				title={<Text bold align="center">Five Tick Color</Text>}>
				<ColorSelect
					settingsKey="tickFiveColor"
					colors={allColors}
				/>
				<Slider
					label="Five Tick Width"
					settingsKey="tickFiveStroke"
					min="1"
					max="10"
				/>
			</Section>
			<Section
				title={<Text bold align="center">Reset All Settings</Text>}>
				<Button
					label="Reset"
					onClick={() => props.settingsStorage.clear() }
				/>
			</Section>
		</Page>
	)
}

registerSettingsPage( smoothieSettings )
