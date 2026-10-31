/* Original practice content based on Grade 7 General EOT1 2026–27 specification.
   All 26 multiple-choice questions per mock have exactly three options.
   Writing is never automatically marked. */
window.DATA = (() => {
const vocabGroups = {
  'Food for Life':[
    ['healthy','good for your body','Fresh vegetables help us stay healthy.','🥗','/ˈhel.θi/'],
    ['fresh','new and not old or spoiled','We bought fresh dates at the market.','🍎','/freʃ/'],
    ['producer','a plant that makes its own food','Grass is a producer in a food chain.','🌱','/prəˈdjuː.sər/'],
    ['consumer','a living thing that eats plants or animals','A rabbit is a consumer.','🐇','/kənˈsjuː.mər/'],
    ['predator','an animal that hunts other animals for food','The eagle is a predator.','🦅','/ˈpred.ə.tər/'],
    ['prey','an animal hunted by another animal','The mouse is prey for the owl.','🐁','/preɪ/'],
    ['plastic','a material used to make bags and bottles','Use less plastic to help the environment.','♻️','/ˈplæs.tɪk/']
  ],
  'How Things Work':[
    ['evaporation','when liquid water changes into water vapour','Heat causes evaporation of water.','☀️','/ɪˌvæp.əˈreɪ.ʃən/'],
    ['condensation','when water vapour changes into liquid water','Condensation makes drops on a cold glass.','💧','/ˌkɒn.denˈseɪ.ʃən/'],
    ['filter','something that removes unwanted materials from water or air','A filter removes dirt from water.','🚰','/ˈfɪl.tər/'],
    ['supply','to provide something that is needed','The tank can supply clean water.','🚚','/səˈplaɪ/'],
    ['engineer','a person who designs or builds machines and systems','An engineer designed the water system.','👷‍♀️','/ˌen.dʒɪˈnɪər/']
  ],
  "It's a Small World":[
    ['advantage','a good or helpful feature','An advantage of video calls is seeing family far away.','✅','/ədˈvɑːn.tɪdʒ/'],
    ['drawback','a disadvantage or problem','A drawback of travel is the cost.','⚠️','/ˈdrɔː.bæk/'],
    ['communicate','to share information or ideas','People communicate using many languages.','💬','/kəˈmjuː.nɪ.keɪt/'],
    ['translate','to change words from one language into another','I can translate the message into English.','🌍','/trænzˈleɪt/']
  ],
  Patterns:[
    ['pattern','shapes or numbers that repeat in an organised way','The tiles have a blue and white pattern.','🔷','/ˈpæt.ən/'],
    ['sequence','things or numbers in a particular order','Find the next number in the sequence.','🔢','/ˈsiː.kwəns/'],
    ['sum','the answer when numbers are added','The sum of three and four is seven.','➕','/sʌm/'],
    ['number','a symbol or word showing an amount','Six is an even number.','6️⃣','/ˈnʌm.bər/'],
    ['hexagon','a flat shape with six sides','A honeycomb has hexagon shapes.','⬡','/ˈhek.sə.ɡən/'],
    ['square','a flat shape with four equal sides','The designer drew a small square.','🟦','/skweər/']
  ]
};
const grammarVocab=['cocoa','tea','rice','dates','crop','grow','produce','country','chocolate','port'];
const grammar = [
 {id:'quant',title:'Quantifiers',icon:'🍚',tag:'G.7.5',rule:'Use many with countable plural nouns and much with uncountable nouns. Use some in positive sentences and any often in questions and negatives. A few is for countable nouns; a little is for uncountable nouns.',pos:'There are many dates in the basket.',neg:'There isn’t much rice in the bowl.',question:'Are there any bananas?',mistake:'❌ many rice  →  ✅ much rice',tip:'Check if you can count the noun before choosing.',quiz:[
  ['How ___ rice do we need?',['many','much','few'],1,'Rice is uncountable, so use much.'],
  ['We have ___ dates on the plate.',['a little','a few','much'],1,'Dates are countable; use a few.'],
  ['There isn’t ___ tea left.',['many','any','a few'],1,'Any works in negative sentences.'],
  ['There are ___ visitors at the port.',['many','much','little'],0,'Visitors can be counted.'],
  ['Can I have ___ water, please?',['some','many','a few'],0,'Some is natural in a polite request.']
 ]},
 {id:'count',title:'Countable & Uncountable Nouns',icon:'🍫',tag:'G.9.3',rule:'Countable nouns can have singular and plural forms: one date / three dates. Uncountable nouns do not usually take a plural -s: rice, cocoa, water, tea.',pos:'There are two dates.',neg:'There is no rice.',question:'Is there any cocoa?',mistake:'❌ two rices  →  ✅ two bowls of rice',tip:'Look for a unit such as a cup of tea.',quiz:[
  ['Which noun is usually uncountable?',['date','country','rice'],2,'Rice is normally uncountable.'],
  ['Choose the correct phrase.',['three teas leaves','three dates','many cocoa'],1,'Dates can be counted and use the plural -s.'],
  ['There ___ some chocolate on the table.',['is','are','were'],0,'Chocolate is treated as uncountable here.'],
  ['There are five ___.',['crop','crops','rice'],1,'Five requires a countable plural noun.'],
  ['We need two ___ of water.',['bottle','bottles','waters'],1,'Bottles is a countable unit.']
 ]},
 {id:'defining',title:'Defining Relative Clauses',icon:'🔗',tag:'G.4.1',rule:'A defining clause tells us which person or thing. Use who for people, which/that for things. It is essential information, so do not use commas.',pos:'An engineer is a person who designs machines.',neg:'This is not the port that ships rice.',question:'Which is the farmer who grows dates?',mistake:'❌ A farmer, who grows dates, sells them. (when identifying which farmer) → ✅ A farmer who grows dates sells them.',tip:'Ask: Do I need this information to know which one?',quiz:[
  ['The worker ___ grows rice is a farmer.',['who','where','when'],0,'Who refers to a person.'],
  ['This is the filter ___ cleans the water.',['who','that','when'],1,'That refers to the filter (a thing).'],
  ['Choose the correctly punctuated defining clause.',['The girl, who speaks Arabic, is here.','The girl who speaks Arabic is here.','The girl which speaks Arabic is here.'],1,'The clause identifies which girl; no commas are needed.'],
  ['This is the chocolate ___ my aunt bought.',['which','who','where'],0,'Which refers to a thing.'],
  ['The people ___ work at the port are busy.',['which','whose','who'],2,'Who refers to people.']
 ]},
 {id:'nondefining',title:'Non-defining Relative Clauses',icon:'📝',tag:'G.4.2',rule:'A non-defining clause adds extra information. Use commas around this extra information. Use who for people and which for things. Do not use that in non-defining clauses.',pos:'My aunt, who lives in Al Ain, grows dates.',neg:'This extra clause does not identify which aunt.',question:'What extra fact does the clause add?',mistake:'❌ Dubai, that has a large port, is a city. → ✅ Dubai, which has a large port, is a city.',tip:'If you remove the clause, is the main sentence still clear?',quiz:[
  ['Fujairah, ___ has a busy port, is in the UAE.',['that','which','who'],1,'Use which for a thing/place with commas.'],
  ['My uncle, ___ is a farmer, grows crops.',['who','which','that'],0,'Who adds extra information about a person.'],
  ['Which sentence is correct?',['Hana who lives here, likes dates.','Hana, who lives here, likes dates.','Hana, that lives here, likes dates.'],1,'Extra information is placed between commas.'],
  ['The UAE, ___ has many beautiful places, welcomes visitors.',['who','that','which'],2,'Which is correct after the comma.'],
  ['In non-defining clauses, do not use ___.',['which','who','that'],2,'That is not used in non-defining relative clauses.']
 ]},
 {id:'zero',title:'Zero Conditional',icon:'🌧️',tag:'G.5.1',rule:'Use if + present simple, present simple for facts and things that generally happen. The if-clause can come first or second.',pos:'If water gets hot, it evaporates.',neg:'If plants do not get water, they do not grow well.',question:'What happens if you heat water?',mistake:'❌ If you heat water, it will evaporates. → ✅ If you heat water, it evaporates.',tip:'The rule is present simple + present simple.',quiz:[
  ['If water cools, it ___.',['condense','condenses','condensing'],1,'The result clause uses present simple.'],
  ['If you ___ two and two, you get four.',['add','added','will add'],0,'A general fact takes the present simple.'],
  ['If seeds get water, they ___.',['grow','grew','grows'],0,'Use grow with they.'],
  ['If plants do not get sunlight, they ___ well.',['do not grow','does not grows','not grow'],0,'Use do not + base verb with plants.'],
  ['Choose a zero conditional.',['If it rains, the ground gets wet.','If it rained, I would go.','If it rains, I will take a coat.'],0,'Zero conditional expresses a general truth.']
 ]},
 {id:'sequence',title:'Sequencing Adverbs',icon:'🔢',tag:'G.2.2',rule:'Use first, next, then, after that and finally to show the order of steps. A comma often follows an introductory sequencing word.',pos:'First, wash the dates. Next, put them in a bowl. Finally, serve them.',neg:'Do not put finally before the first stage.',question:'What happens after the water is filtered?',mistake:'❌ Finally, wash the fruit. First, eat it. → ✅ First, wash the fruit. Finally, eat it.',tip:'Picture the order before you choose.',quiz:[
  ['___, wash the fruit before eating it.',['Finally','First','Last'],1,'First introduces the opening step.'],
  ['Wash the dates. ___, put them on a plate.',['Next','Yesterday','Because'],0,'Next introduces the following step.'],
  ['___, serve the finished dish.',['First','However','Finally'],2,'Finally introduces the last step.'],
  ['Choose the natural sequence.',['Finally → First → Next','First → Next → Finally','Next → Finally → First'],1,'Steps should be in order.'],
  ['First, wash the rice. ___, cook it in water.',['Then','Although','Yet'],0,'Then marks the next stage.']
 ]}
];
const reading = [
 {id:'a1',title:'The Missing Rabbits',category:'3A',level:'A2.1–A2.2',theme:'Food chains and food webs',text:`On Monday, Mariam and her class visited a small nature garden near their school. Their teacher, Ms Noor, asked them to look at the food web. There were green plants, insects, rabbits, snakes and eagles in the garden.

First, Mariam saw a rabbit eating leaves. “The leaves give the rabbit energy,” explained Ms Noor. “The rabbit is a consumer, and the green plant is a producer.” An eagle flew above them. It looked for a small animal to eat.

The next week, the class returned. Mariam noticed that there were fewer rabbits. A new fence had stopped some rabbits from reaching the garden. The grass was growing taller because fewer rabbits were eating it. The eagles had to search for food in other places.

Mariam drew arrows between the plants and animals in her notebook. She learnt that every living thing has a role. If the number of one animal changes, other parts of the food web can change too. At the end of the visit, the class put up a sign asking people to protect the garden and its animals.`,qs:[
  ['Where did Mariam visit on Monday?',['A nature garden','A shopping centre','A museum'],0,'The opening sentence says the class visited a small nature garden.','specific'],
  ['Which animal was eating leaves?',['An eagle','A rabbit','A snake'],1,'Mariam saw a rabbit eating leaves.','specific'],
  ['What is the producer in the story?',['The eagle','The rabbit','The green plant'],2,'Ms Noor calls the green plant a producer.','specific'],
  ['Why was the grass growing taller?',['Fewer rabbits were eating it.','More eagles were flying.','Students watered it every day.'],0,'The third paragraph directly explains the taller grass.','specific'],
  ['What did Mariam draw in her notebook?',['A new fence','Arrows between plants and animals','A map of the city'],1,'The last paragraph describes Mariam drawing arrows.','detail'],
  ['What did the class put up?',['A sign to protect the garden','A new animal cage','A large shopping poster'],0,'The class put up a sign asking people to protect the garden.','detail'],
  ['The word “role” is closest in meaning to ___.',['colour','job or function','size'],1,'Each organism has a job or function in the food web.','inference'],
  ['What is the best message of the story?',['Only eagles are important.','Plants never change.','Changes to one species can affect others.'],2,'The story shows how fewer rabbits affected grass and eagles.','overall']
 ]},
 {id:'b1',title:'Patterns in Islamic Art',category:'3B',level:'B1.1',theme:'Patterns and Islamic art',text:`Many visitors to the UAE enjoy looking at the beautiful patterns in mosques, museums and traditional buildings. Islamic geometric art often uses repeating shapes, such as squares, circles and hexagons. Artists can create complex designs from a small number of simple shapes.

One common feature is symmetry. This means that parts of a design match when they are turned or reflected. Another important feature is repetition. A shape may appear many times, but the artist changes its direction or colour to make the design interesting. These patterns can continue across a large wall or floor without one obvious ending.

Geometry also connects art with mathematics. For example, students can use a ruler to draw a square and divide it into triangles. By repeating and rotating these shapes, they can create a new design. Some artists use computers today, but the ideas behind their work are centuries old.

When students study these patterns, they learn more than how to draw. They discover how mathematics, history and creative thinking can work together. They may even notice similar sequences in floor tiles, fabrics and nature.`,qs:[
  ['Which shape is mentioned as common in Islamic geometric art?',['Hexagon','Heart','Cloud'],0,'The first paragraph names squares, circles and hexagons.','detail'],
  ['What does symmetry mean in the passage?',['Every line is red.','Parts match when reflected or turned.','The design has only one shape.'],1,'The second paragraph defines symmetry.','detail'],
  ['How do artists make repeated shapes interesting?',['They hide all shapes.','They remove the colours.','They change direction or colour.'],2,'The paragraph says artists change the direction or colour.','detail'],
  ['What tool can students use to draw a square?',['A ruler','A clock','A spoon'],0,'The third paragraph mentions a ruler.','detail'],
  ['The word “complex” most nearly means ___.',['very simple','made of many connected parts','broken and unusable'],1,'Complex designs are built from repeated simple shapes.','inference'],
  ['The word “centuries” suggests the design ideas are ___.',['very new','less than one day old','hundreds of years old'],2,'A century is one hundred years.','inference'],
  ['Which other place might show repeated geometric patterns?',['A tiled floor','An empty page','A plain sheet without designs'],0,'The last paragraph connects these patterns with floor tiles and fabrics.','connections'],
  ['What is the main idea?',['Artists must avoid maths.','Islamic patterns combine art, maths and history.','All buildings have the same design.'],1,'The passage links geometric design with mathematics and history.','overall']
 ]},
 {id:'a2',title:'A Change in the School Garden',category:'3A',level:'A2.1–A2.2',theme:'Food chains and food webs',text:`Every Thursday, Aisha helped her school garden club. The students grew small plants beside a wall. Butterflies visited the flowers, and lizards often waited near the stones. Birds sometimes came to eat insects. Their teacher called this a simple food web.

One morning, Aisha found many small insects on the leaves. There were fewer lizards because workers had moved some stones away. “The lizards usually eat these insects,” said her friend Salma. “Now the insects have fewer predators.” Some leaves had small holes where the insects had eaten them.

The club decided to help. First, they asked the workers to put a few safe stones back in the garden. Then they planted more flowers and kept the area clean. They did not try to hurt the insects. They wanted to give the animals a good place to live.

Two weeks later, Aisha saw more lizards. The students also noticed healthier leaves on several plants. Their teacher reminded them that plants and animals are connected. Aisha wrote a short report explaining how a small change to one animal's home could affect the whole garden.`,qs:[
  ['When did Aisha help the club?',['Every Thursday','Every Sunday','Every Monday'],0,'The first sentence says every Thursday.','specific'],
  ['Which animals waited near the stones?',['Butterflies','Lizards','Birds'],1,'The first paragraph describes lizards near the stones.','specific'],
  ['Why were there fewer lizards?',['The plants disappeared.','The birds moved away.','Workers moved some stones.'],2,'The second paragraph explains why the lizards left.','specific'],
  ['What did the insects eat?',['Leaves','Stones','Water'],0,'Aisha noticed holes in the leaves where insects had eaten.','specific'],
  ['What did students ask the workers to do?',['Paint the wall','Put safe stones back','Remove every flower'],1,'The students requested safe stones.','detail'],
  ['What happened two weeks later?',['There were more lizards.','There were no plants.','There were more stones than flowers.'],0,'Aisha saw more lizards two weeks later.','detail'],
  ['“Predators” in the story are animals that ___.',['make their own food','eat other animals','grow flowers'],1,'Lizards are predators because they eat insects.','inference'],
  ['What does the story mainly show?',['All insects are harmful.','Gardens never change.','Living things in a garden affect one another.'],2,'The change in lizard numbers affected insects and plants.','overall']
 ]},
 {id:'b2',title:'Geometry All Around Us',category:'3B',level:'B1.1',theme:'Patterns and Islamic art',text:`Look closely at a decorated door, a mosque window or a traditional carpet in the UAE. You may discover shapes that repeat in careful sequences. Artists have used these geometric patterns for many generations, especially in Islamic art. Squares, triangles and six-sided hexagons can fit together to create remarkable designs.

A repeating pattern often begins with one basic shape. The artist moves, turns or reflects that shape to build a larger arrangement. When both sides of a design match, the design has symmetry. A pattern may look difficult at first, but it becomes easier to understand when you find the smallest repeating part.

These designs are closely connected to mathematics. Architects and craftspeople measure lengths and angles to make shapes fit accurately. A small mistake can cause a gap where two pieces should meet. Today, computer programs can help designers test their ideas, although drawing by hand remains important.

Students can find examples of these ideas beyond historic buildings. Repeating shapes appear on modern walls, notebooks and floors. Even a honeycomb shows how hexagons fit together without leaving empty spaces. Studying patterns can help students notice connections between art, maths, cultural history and the natural world.`,qs:[
  ['Where can visitors see geometric patterns?',['On a decorated door','Only in oceans','Only inside computers'],0,'The opening sentence names decorated doors.','detail'],
  ['How many sides does a hexagon have?',['Five','Six','Eight'],1,'The first paragraph calls them six-sided hexagons.','detail'],
  ['What can artists do to a shape to build a larger design?',['Throw it away','Keep it invisible','Turn or reflect it'],2,'The second paragraph mentions moving, turning and reflecting.','detail'],
  ['What helps craftspeople make shapes fit?',['Measuring lengths and angles','Guessing all sizes','Using only bright colours'],0,'The third paragraph explains measuring.','detail'],
  ['“Remarkable” in the passage means ___.',['uninteresting','impressive','unfinished'],1,'Remarkable describes impressive patterns.','inference'],
  ['A “basic” shape is the ___.',['most complicated shape','final building','simple starting shape'],2,'The basic shape is the starting part that repeats.','inference'],
  ['Which natural example uses repeating hexagons?',['A honeycomb','A river wave','A cloud'],0,'The final paragraph connects honeycombs with hexagons.','connections'],
  ['What is the main purpose of the text?',['To argue that computers are unnecessary','To explain patterns and their links to other subjects','To list only mathematical answers'],1,'The text covers art, maths, culture and nature.','overall']
 ]}
];
// Multiple-choice gap items. The visible grammar passage is stored with [[1]]..[[5]] placeholders.
const exams=[
 {id:'mock1',name:'Mock Examination 1',vocab:[
  ['A lion is a ___ because it hunts other animals.',['producer','predator','pattern'],1,'A predator hunts other animals.'],
  ['An ___ designs machines and useful systems.',['engineer','consumer','square'],0,'An engineer designs or builds systems.'],
  ['A language app can ___ words into Arabic.',['supply','translate','filter'],1,'Translate means change words into another language.'],
  ['The tiles follow a repeating ___.',['plastic','drawback','pattern'],2,'A pattern is a repeating design.'],
  ['When water vapour becomes small drops, this is ___.',['condensation','evaporation','sequence'],0,'Condensation changes vapour into liquid.']
 ],grammar:{intro:'Where Do Dates Come From?',text:`Dates are popular in the UAE, and farms [[1]] grow them are important to many families. My grandmother, [[2]] lives near Al Ain, knows a lot about date palms. Farmers need water, but there is not [[3]] water in very dry places. If a date palm gets enough sun and water, it [[4]] well. The fruit is collected when it is ready. [[5]], workers check the dates carefully. Next, they wash and pack them in boxes. Some boxes go to local shops, and others travel by road to a port. From there, ships take the fruit to different countries. People around the world enjoy dates as a tasty snack and share them with their families.`,gaps:[
  [['who','which','where'],1,'The relative clause identifies the farms, which are things.'],
  [['who','which','that'],0,'Who adds extra information about grandmother; commas are used.'],
  [['many','much','a few'],1,'Water is uncountable, so much is correct.'],
  [['grow','grows','grew'],1,'Zero conditional: if + present simple, present simple.'],
  [['Finally','First','Yesterday'],1,'First begins the sequence; next follows it.']
 ]},readA:'a1',readB:'b1',writing:'food'},
 {id:'mock2',name:'Mock Examination 2',vocab:[
  ['A ___ makes its own food using sunlight.',['producer','prey','consumer'],0,'Green plants are producers.'],
  ['Heat causes water to turn into vapour through ___.',['condensation','evaporation','translation'],1,'Evaporation changes liquid water into vapour.'],
  ['A good ___ removes dirt from drinking water.',['hexagon','filter','sequence'],1,'A filter separates unwanted material.'],
  ['One ___ of travelling is learning about cultures.',['advantage','drawback','prey'],0,'An advantage is a benefit.'],
  ['A shape with six sides is a ___.',['square','number','hexagon'],2,'Hexagons have six sides.']
 ],grammar:{intro:'From Cocoa to Chocolate',text:`Cocoa comes from trees [[1]] grow in warm countries. My teacher, [[2]] enjoys learning about food, explained this process in class. First, farmers collect the cocoa pods and open them. Then, they take out the beans. There are [[3]] beans inside each pod, but there is not much chocolate yet. Workers dry the beans in the sun. If beans get wet during drying, they [[4]] more slowly. After that, the dried beans travel to a factory, where machines turn them into chocolate. [[5]], the finished chocolate is wrapped and sent to shops. Many people buy it as a treat. The journey shows how food can travel from farms to shops in different countries.`,gaps:[
  [['who','that','where'],1,'That describes trees (things) and is defining.'],
  [['who','which','that'],0,'Use who for a person in a non-defining clause.'],
  [['many','much','a little'],0,'Beans are countable plural nouns.'],
  [['dry','dries','drying'],0,'Beans is plural, so the present simple verb is dry.'],
  [['First','Finally','Before'],1,'Finally introduces the last step.']
 ]},readA:'a2',readB:'b2',writing:'uae'}
];
const writing={
 food:{title:'Preparing a Healthy Fruit Salad',theme:'Food for Life • How can food improve your health?',question:'Look at the four pictures of preparing a healthy fruit salad. Describe what happened at each stage and explain how the salad is prepared. Use sequencing words and phrases. Write at least 100 words in complete sentences.',stages:[['🍎','Fresh fruit','Choose apples, bananas and oranges','assets/fruit.svg'],['🚿','Wash fruit','Wash the fruit with clean water','assets/wash.svg'],['🔪','Cut the fruit','Cut it into small pieces safely','assets/cut.svg'],['🥣','Serve salad','Mix the pieces and serve in a bowl','assets/mix.svg']],model:`First, we choose some fresh fruit to make a healthy fruit salad. We can use apples, bananas and oranges because they are tasty and full of useful nutrients. It is important to choose fruit that is clean and ready to eat.\n\nNext, we wash the fruit carefully with clean water. This helps us remove dirt from the fruit before we prepare it.\n\nThen, an adult helps us cut the fruit into small pieces. We put all the pieces into a large bowl and mix them gently.\n\nFinally, we serve the colourful fruit salad to our family. This is a simple way to enjoy a healthy snack and eat different kinds of fruit.`},
 uae:{title:'A Family Visit to a UAE Heritage Place',theme:"It's a Small World • What can visitors see and do in the UAE?",question:'Look at the four pictures of a family visit to a UAE heritage place. Describe what happened at each stage and explain the order of the visit. Use sequencing words and phrases. Write at least 100 words in complete sentences.',stages:[['🗺️','Plan the trip','Choose a heritage place and plan a visit','assets/plan.svg'],['🚌','Travel there','Travel safely with family','assets/arrive.svg'],['🏰','Explore the site','See an old fort and learn about its history','assets/museum.svg'],['📸','Share memories','Take photos and tell friends about the visit','assets/photos.svg']],model:`First, our family plans a day trip to a heritage place in the UAE. We look at a map and choose an old fort that we want to visit. We prepare water and everything we need for the day.\n\nNext, we travel to the place together. We enjoy looking at the buildings and roads during the journey.\n\nThen, we explore the old fort. We look at the doors, walls and interesting objects. We learn why the place is important and how people lived in the past.\n\nFinally, we take some family photographs and return home. We share our favourite memories with our friends. The visit helps us learn more about the history and culture of the UAE.`}
};
const extras={
 matching:[['producer','a living thing that makes its own food'],['prey','an animal hunted by another'],['engineer','a person who designs machines'],['hexagon','a shape with six sides']],
 order:['First','Next','Then','Finally'],
 spell:[['conden_ation','condensation','Water vapour becomes drops through condensation.'],['pred_tor','predator','An eagle is a predator.'],['evap_ration','evaporation','Water becomes vapour by evaporation.'],['sequ_nce','sequence','A sequence is an organised order.']]
};
return {vocabGroups,grammarVocab,grammar,reading,exams,writing,extras};
})();
