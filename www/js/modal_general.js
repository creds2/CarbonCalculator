var popChart;

makeChartsPopulation = function(sub){
  
  var subpop = [
    sub.pop_2011,
    sub.pop_2012,
    sub.pop_2013,
    sub.pop_2014,             
    sub.pop_2015,
    sub.pop_2016,
    sub.pop_2017,
    sub.pop_2018
    ];
  
  // Population Chart
	if(popChart){
		popChart.destroy();
	}
		
	var popctx = document.getElementById('popChart').getContext('2d');
	popChart = new Chart(popctx, {
		type: 'bar',
		data: {
			labels: ['2011','2012','2013','2014','2015','2016','2017','2018'],
			datasets: [{
				label: 'Population',
				data: subpop,
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			}]
		},
		options: {
		  legend: {position: 'bottom'},
			scales: {
				yAxes: [{
				  scaleLabel: {
            display: true,
            labelString: 'people'
          },
					ticks: {
						beginAtZero: true
					}
				}]
			},
			responsive: true,
			maintainAspectRatio: false
		}
	});
	
};




function switchPenPortSub(SOAC11NM) {
  
  var pp = "No Desc";
  switch(SOAC11NM) {
  case "Achieving neighbourhoods":
    pp = `<p>This group is the least densely populated of the four groups comprising the ethnically-diverse professionals supergroup and with a lower median age (36 years) than for the parent supergroup (38 years).</p>

<p>Residents are slightly more likely to be born in the UK or Ireland and to live in a terraced property than the parent supergroup and households are more likely to own or have shared ownership of their property (74.4% of all households). Workers are more likely than the parent supergroup to use private transport to get to work and to work in the public administration or defence; compulsory social security industries. </p>`;
    break;
  case "Affluent communities":
    pp = `<p>This group has the joint-highest median age (47 years) of all the groups and a higher proportion of persons living in communal establishments than with the parent supergroup, and aged 90 years or over.</p>

<p>There is a higher proportion of all non-White ethnic groups compared with the parent supergroup. Households are more likely to live in a detached property (over half of all households), more likely to live in a flat and marginally more likely to own or have shared ownership of a property. Workers are more likely to use public transport to get to work (though only 9.0% do so) and to work in the information and communication or professional-related industries.</p>`;
    break;
  case "Ageing rural neighbourhoods":
    pp = `<p>Residents within this group cluster have the highest joint-median age (47 years) of all the 24 groups and compared with the parent supergroup, there is a noticeably higher proportion of residents living in a communal establishment and an observably higher proportion aged 90 years and over. A higher proportion of residents have mixed ethnicity or are from multiple ethnic groups.</p>

<p>Households are more likely to live in a terraced property or a flat (though for these two housing types combined, less than one-quarter of all households do so) and to privately rent than for the parent supergroup, though most households live in a detached property (55.2%). Employed residents are also marginally more likely to use public transport, cycle or walk to work and to work in the accommodation or food service activities industries than for the parent supergroup. </p>`;
    break;
  case "Ageing suburbanites":
    pp = `<p>This group has the joint highest median age (47 years) of all the groups.Compared with the parent supergroup, households are more likely to live in a semi-detached property (comprising a half of all households) and marginally more likely to own or have shared ownership of a property – this covers 89.9% of all households, the highest percentage for any of the 24 groups. Workers are marginally more likely to use private transport to get to work (and was the stated main method of transport for over three-quarters of all workers aged 16 to 74 years) and to work in the manufacturing industry.</p>`;
    break;
  case "Ageing urban communities":
    pp = `<p>This group has the highest median age (46) of the five groups comprising the industrious communities supergroup (median age 42 years).</p>

<p>Compared with the supergroup, there is a noticeably higher proportion of residents who live in a communal establishment (nearly 5% of all residents) and a noticeably higher proportion of residents aged 90 years and over. Amongst households there is a higher proportion who live in a detached property and a higher proportion who live in a flat.</p>

<p>Educational qualifications are generally higher than the supergroup and for those in employment a higher proportion walk or cycle to work. There is also a higher prevalence of workers in the information and communication or professional-related activities. </p>`;
    break;
  case "Asian traits":
    pp = `<p>This group has a higher median age (40 years) than for the parent supergroup (38 years). There is also an observably higher proportion of residents from the Indian and Pakistani ethnic groups and a higher proportion of residents whose main language is not English and cannot speak English well or at all. Households are more likely to live in a detached property (25.9% of all households) or a semi-detached property (47.6% of households) and to have two or more cars (40.7% of households).</p>

<p>Workers are more likely to use public transport to travel to work and to work in the education sector than the parent supergroup.</p>`;
    break;
  case "Aspiring urban households":
    pp = `<p>This group has the lowest median age (39 years) of the five groups comprising the industrious communities supergroup (median age 42 years) and the highest population density (17.1 persons per hectare).</p>

<p>The proportion of persons of non-White ethnic group is generally higher than for the supergroup, whilst households are more likely to live in a terraced property (36.7% of all households) and to be privately renting.</p>

<p>Unemployment rates are below that for the supergroup, whilst for those in employment there was a marginally higher proportion of full-time workers and a higher proportion working in financial-related industries.</p>`;
    break;
  case "Challenged white communities":
    pp = `<p>Of the four groups within the supergroup, this group has the lowest population density (26.3 persons per hectare). Residents belonging to this group are more likely to have been born in the UK or Ireland than for the parent supergroup. Households are also more likely to live in a semi-detached property (36.8% of all households) or terraced property (41.5% of all households).</p>

<p>Households are also marginally more likely to own or have shared ownership of a property and to live in socially-rented accommodation (41.4% of households).</p>

<p>For residents in employment, they are marginally more likely than the parent supergroup to use private transport to get to work and more likely to work in the energy, water or air conditioning supply industries than the parent supergroup. </p>`;
    break;
  case "Comfortable neighbourhoods":
    pp = `<p>The characteristics of this group are very similar to the parent supergroup. There is though a higher proportion of households who live in a flat (covering one-fifth of all households) and who live in socially-rented accommodation (covering one-fifth of all households). Educational qualifications are higher than for the supergroup and workers are more likely to use public transport to get to work and to work in financial-related industries. </p>`;
    break;
  case "Comfortable suburbia":
    pp = `<p>This group has the lowest median age (40 years) of the three groups within the supergroup and a slightly higher proportion of persons in all the non-White ethnic groups than for the parent supergroup. Households are more likely to live in a terraced property (though only 16.9% of households do so) and to either privately rent or live in social rented accommodation, though the large majority of households either own outright or have shared ownership of their property. Workers are more likely to work in the transport or storage industries.</p>`;
    break;
  case "Constrained renters":
    pp = `<p>Compared with the parent supergroup, residents are more likely to be living in a communal establishment and more likely to be in privately-rented accommodation (over a quarter of all households) and to be living in a terraced property (47.2% of households, the highest percentage for any of the 24 groups).</p>

<p>Workers are more likely to work full-time and to work in the agriculture, forestry and fishing industries. </p>`;
    break;
  case "Cosmopolitan student neighbourhoods":
    pp = `<p>The group and parent group are the same in terms of SOA representation. The description for the cosmopolitan student neighbourhoods supergroup therefore also applies for this group, which bears the same name as the parent supergroup.</p>`;
    break;
  case "Endeavouring social renters":
    pp = `<p>The characteristics of this group are also very similar to the parent supergroup. There is though a higher proportion of households who live in a semi-detached property (covering nearly a half of all households) and who live in socially-rented accommodation (covering over a fifth of all households).</p>

<p>Unemployment is higher than for the supergroup and compared with the parent supergroup, workers are more likely to use public transport to get to work (though over three-quarters of workers in fact use private transport to get to work) and to work in the energy, water or air conditioning supply industries. </p>`;
    break;
  case "Hampered neighbourhoods":
    pp = `<p>Of the four groups within the parent supergroup, this group has the lowest median age (35 years), with higher proportions of residents in the 0 to 4 years and 5 to 14 years age groups. A noticeably higher proportion of residents have mixed ethnicity or are from multiple ethnic groups. All non-White ethnic groups have a higher representation than for the supergroup.</p>

<p>Compared with the parent supergroup, households are more likely to live in a semi-detached property (over one-third of all households) – though households who live in a terraced property are slightly more prevalent and households are also more likely to be socially renting (42.7% of households). Workers are more likely to use public transport to get to work and to work in the education sector.</p>`;
    break;
  case "Hard-pressed flat dwellers":
    pp = `<p>Of the groups within the parent supergroup, this group has the highest median age (39 years), the same as the UK median age and has the highest population density (36.8 persons per hectare) and lowest proportion of land area. As implied by the name for this group, there is a noticeably higher proportion of households who live in a flat (70.8% of all households) than for the parent supergroup, and social renting is also more prevalent (a half of all households socially-rented – the highest for any of the 24 groups).</p>

<p>Unemployment is also higher than for the parent supergroup (at 8.6% of all residents aged 16 to 74 years, this was the highest level out of all the 24 groups) and workers are more likely to work in financial-related industries.</p>`;
    break;
  case "Highly qualified professionals":
    pp = `<p>Compared with the supergroup, there is an observably higher proportion of persons aged 90 years and over. Residents are marginally more likely to live in a detached property, but also markedly more likely to live in a flat (41.2% of households) than for the supergroup. Households are more likely to privately rent their accommodation than the parent supergroup. Of the four groups within the ethnically diverse professionals supergroup, adults within this group have the highest qualification levels.</p>

<p>Residents in employment are more likely to work within the information-related industries (16.9% of all workers aged 16 to 74 years).</p>`;
    break;
  case "Households in terraces and flats":
    pp = `<p>This group has the highest population density (30.3 persons per hectare) of all the four groups within the parent supergroup.</p>

<p>Compared with the parent supergroup, the groups have a higher proportion of persons whose ethnic group is recorded as Black, African, Caribbean or Black British. Residents are also much more likely to live in a terraced property (over one-third of all households) and marginally more likely to live in a flat (as do a quarter of all households) and to live in socially-rented accommodation.</p>

<p>Unemployment is higher for this group than for the other three groups within the parent supergroup, whilst those in employment are more likely to work in the transport or storage industries.</p>`;
    break;
  case "Inner city cosmopolitan":
    pp = `<p>The group and parent group are the same in terms of SOA representation. The description for the inner city cosmopolitan supergroup therefore also applies for this group, which bears the same name as the parent supergroup.</p>`;
    break;
  case "Primary sector workers":
    pp = `<p>This group has the lowest population density of the five groups within the supergroup. There is a higher prevalence of households living in a detached property (a quarter of all households) and living in a flat than with the parent supergroup. Households are also more likely to live in socially-rented accommodation.</p>

<p>Workers are more likely to walk or cycle to work and to work in the agriculture, forestry and fishing industries, and the accommodation or food service activities industries.</p>`;
    break;
  case "Prospering countryside life":
    pp = `<p>Compared with the parent supergroup, a higher proportion of residents have mixed ethnicity or are from multiple ethnic groups. Residents are also more likely to have a higher level of qualifications. Nearly four-fifths of households own or have shared ownership of their property. Car ownership is also slightly higher than for the parent supergroup – with 57.7% of households having access to two or more cars, which is the highest percentage for any of the 24 groups.</p>

<p>Workers are more likely to use public transport to travel to work than for the parent supergroup and are also more likely to be employed in the information and communication or professional, scientific and technical activities industries and financial-related industries.</p>`;
    break;
  case "Remoter communities":
    pp = `<p>The population of this group live in remoter parts of the UK, though covering half of the total UK land area. This group has the lowest population density of any of the 24 groups (0.2 persons per hectare). Residents are more likely than the parent supergroup to live in a detached property (69.4% of all households do so – the highest percentage for any group). Residents are also marginally more likely to be privately renting, though households owning their own property or have shared ownership is far more prevalent – 77.5% of households.</p>

<p>An observably higher proportion of workers are employed in the agriculture, forestry and fishing industries than with the parent supergroup (the highest for any group at 8.9% of all employed residents aged 16 to 74 years), there is also a higher prevalence of working in the mining, quarrying or construction industries (the highest for any group at 10.2% of all employed residents aged 16 to 74 years). </p>`;
    break;
  case "Rural traits":
    pp = `<p>Of the four groups within the parent supergroup countryside living, the rural traits group has the lowest median age (45 years) though this is above the UK median age (39 years).</p>

<p>Residents are more likely to live in a semi-detached, terraced property, or flat than the parent supergroup and to live in socially-rented accommodation, though owned or shared ownership of a property is also relatively high (74.6% of all households).</p>

<p>Workers are also marginally more likely to walk, cycle or use an alternative method to get to work and to be employed in the energy, water or air conditioning supply industries than for the parent supergroup.</p>`;
    break;
  case "Urban cultural mix":
    pp = `<p>This group has a higher proportion of persons who are White than with the parent group and higher proportion of persons born in the UK or Ireland. Households are more likely to live in a flat (over one-third of all households) and to live in socially-rented accommodation (one-third of all households).</p>

<p>Workers are more likely to work in the energy, water or air conditioning supply industries and human health and social work activities industries.</p>`;
    break;
  case "Young ethnic communities":
    pp = `<p>The population of this group have the second-lowest median age (30 years) of all the 24 groups. There is a higher proportion of persons for most of the non-White ethnic groups than with the parent supergroup. Households are more likely to live in a detached property (though just 8.1% of households do so) and to live in privately-rented accommodation (over a quarter of all households).</p>

<p>Qualifications levels are generally higher than with the parent supergroup, whilst workers are more likely to work part-time (one-third do so) and to work in the accommodation or food service activities industries. </p>`;
    break;
  default:
    pp = `<p>No Description</p>`;
  } 
  
  document.getElementById("penportsub").innerHTML = pp;
}


function switchPenPortSup(SOAC11NM) {
  
  var pp1 = `<p>The population of this supergroup typically live in cities and major towns across the UK containing universities, and because of this, there is a large student population, characterised by a relatively large proportion of households with full-time students (8.5%).</p>

<p>Residents are much more likely to live in communal establishments – such as university halls of residences and flats. Residents are also more likely than nationally to live in private or social rented accommodation (applies to 62.0% of all households). There is a much younger age structure than nationally, with a median age of 26 years – the lowest of any of the eight supergroups. The supergroup has an above average ethnic mix and below average proportion of residents UK and Irish born.</p>

<p>Qualification levels are higher than nationally, and for those in employment, a higher proportion use public transport or walk and cycle to get to work (over half of all employed residents).</p>

<p>Employed residents aged 16 to 74 years are more likely to work in the accommodation or food service activities industries (11.0% of employed residents, the highest percentage for any supergroup) and to work part-time (31.5% of employed residents, the highest percentage for any supergroup). </p>`;
  
  
  var pp2 = `<p>The population of this supergroup live in rural areas across the whole of the UK, the SOAs covered by this supergroup cover 87% of the total UK land area.</p>

<p>Residents are much more likely to live in detached housing (57.1% of households – the highest percentage for any supergroup) and to own their own property. The supergroup has a below average ethnic mix and above average proportion of UK and Irish born residents. Residents are far more likely to be represented in older age groups than nationally. The median age of 46 years is the highest of all the supergroups. Rates of divorce or separation are lower than nationally and the proportion of persons aged 16 years and over with higher qualifications is above the national average.</p>

<p>Unemployment rates are below the national average, whilst employed residents are noticeably more likely to work in the agriculture, forestry and fishing industries. Households are more likely to own two or more cars or vans and to use private transport to get to work. </p>`;

var pp3 = `<p>The population of this supergroup typically live largely within cities, fringes of cities or in other urban areas across the UK.</p>

<p>Residents are more likely to live in a flat (a quarter of all households do so). The supergroup has an above average ethnic mix and slightly below average proportion of UK and Irish born residents. Residents are more likely to be represented in the younger age groups than nationally. Rates of divorce or separation are marginally lower than nationally and the proportion of persons aged 16 years and over with higher qualifications is above the national average.</p>

<p>Unemployment rates are below the national average, and for employed residents, they are more likely to work in the information and communication industries and financial-related industries than nationally, to work full-time, and are more likely to travel to work using public transport, though households owning two or more cars are also more prevalent than nationally.</p>`;

var pp4 = `<p>Of the four groups within the supergroup, this group has the lowest population density (26.3 persons per hectare). Residents belonging to this group are more likely to have been born in the UK or Ireland than for the parent supergroup. Households are also more likely to live in a semi-detached property (36.8% of all households) or terraced property (41.5% of all households).</p>

<p>Households are also marginally more likely to own or have shared ownership of a property and to live in socially-rented accommodation (41.4% of households).</p>

<p>For residents in employment, they are marginally more likely than the parent supergroup to use private transport to get to work and more likely to work in the energy, water or air conditioning supply industries than the parent supergroup. </p>`;

var pp5 = `<p>The population of this supergroup typically live largely in industrial areas across the UK and is the largest supergroup in terms of resident population – comprising one-fifth of the total UK population.</p>

<p>Residents are more likely to live in detached, semi-detached or terraced housing (89.2% of all households), and to live in social rented accommodation. The supergroup has a below-average ethnic mix and above-average number of UK and Irish born. Residents are more likely to be represented in the older age groups and the proportion of residents aged over 16 years with higher qualifications is below the national average.</p>

<p>Employed residents are more likely to work in the manufacturing industry and mining, quarrying or construction industries and are more likely to travel to work using private transport than nationally. </p>`;

var pp6 = `<p>The population of this supergroup is very localised in its distribution, concentrated in Inner London, but also parts of Outer London, Birmingham, Bristol, Edinburgh, Glasgow, Manchester and Reading, plus small numbers of SOAs in other cities and major towns.</p>

<p>Areas covered by this supergroup are characterised as having a very high population density (average 93.9 persons per hectare), but covering just 0.2% of the UK land area. Residents are far more likely to live in a flat than nationally (79.2% of all households) and to live in private or socially-rented accommodation. The supergroup has a noticeably high ethnic mix, and below average number of UK and Irish born residents. Residents are far more likely to be represented in the 25 to 44 years age group than nationally and the proportion of persons aged 16 years and over with higher qualifications is above the national average.</p>

<p>Unemployment rates are higher than the national average and for employed residents, they are more likely to work in the information and communication industries (over one-fifth of all workers) and financial-related industries than nationally. Workers are also far more likely to work full-time and to use public transport to travel to work (57.8% of all workers – by far the highest for any supergroup).  </p>`;

var pp7 = `<p>The population of this supergroup are represented in the larger urban areas in the UK, except for Northern Ireland. The distribution of SOAs for this supergroup is noticeably localised.</p>

<p>Residents are more likely to live in terraced housing or flats (70.7% of all households) and to rent either privately or through social housing (half of all households). The supergroup has a noticeably high ethnic mix and below-average number of UK and Irish born.</p>

<p>Residents are far more likely to be represented in the 0 to 4 years and 5 to 14 years age group than nationally. Qualification levels are similar to national levels.</p>

<p>Unemployment rates are higher than the national average and employed residents are more likely to work in the transport or storage industries, to work part-time and to use public transport to travel to work (just under one-third of all workers).  </p>`;

var pp8 = `<p>The population of this supergroup typically live largely in areas within or close proximity to larger urban areas across the UK.</p>

<p>Residents are much more likely to live in a detached property (46.5% of all households) and to own their own property (88.7% of all households). The supergroup has a below-average ethnic mix and a higher proportion of UK and Irish born residents than nationally. Residents are far more likely to be represented in older age groups than nationally and there is a relatively high median age of 45 years (compared with 39 years nationally). The proportion of persons aged 16 years and over with higher qualifications is above the national average, as is car ownership (nearly half of all households have two or more cars).</p>

<p>Unemployment rates are noticeably below the national average (at 2.5% the lowest for any supergroup) and for employed residents, they are more likely to work in financial-related industries,and to use private transport to travel to work (three-quarters of all workers used private transport – the highest percentage for any supergroup).</p>`;
  
  var pp = "No Desc";
  switch(SOAC11NM) {
  case "Achieving neighbourhoods":
    pp = pp3;
    break;
  case "Affluent communities":
    pp = pp8;
    break;
  case "Ageing rural neighbourhoods":
    pp = pp2;
    break;
  case "Ageing suburbanites":
    pp = pp8;
    break;
  case "Ageing urban communities":
    pp = pp5;
    break;
  case "Asian traits":
    pp = pp3;
    break;
  case "Aspiring urban households":
    pp = pp5;
    break;
  case "Challenged white communities":
    pp = pp4;
    break;
  case "Comfortable neighbourhoods":
    pp = pp5;
    break;
  case "Comfortable suburbia":
    pp = pp8;
    break;
  case "Constrained renters":
    pp = pp4;
    break;
  case "Cosmopolitan student neighbourhoods":
    pp = pp1;
    break;
  case "Endeavouring social renters":
    pp = pp5;
    break;
  case "Hampered neighbourhoods":
    pp = pp4;
    break;
  case "Hard-pressed flat dwellers":
    pp = pp4;
    break;
  case "Highly qualified professionals":
    pp = pp3;
    break;
  case "Households in terraces and flats":
    pp = pp3;
    break;
  case "Inner city cosmopolitan":
    pp = pp6;
    break;
  case "Primary sector workers":
    pp = pp5;
    break;
  case "Prospering countryside life":
    pp = pp2;
    break;
  case "Remoter communities":
    pp = pp2;
    break;
  case "Rural traits":
    pp = pp2;
    break;
  case "Urban cultural mix":
    pp = pp7;
    break;
  case "Young ethnic communities":
    pp = pp7;
    break;
  default:
    pp = `<p>No Description</p>`;
  } 
  
  document.getElementById("penportsup").innerHTML = pp;
}