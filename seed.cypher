CREATE (:Person {name: 'Bob'}),
(:Person {name: 'Chet'}),
(:Person {name: 'Sam'}),
(:Person {name: 'Harry'}),
(:Person {name: 'Sally'}),
(:Person {name: 'Suzie'}),
(:Person {name: 'Harley'}),
(:Person {name: 'Monica'}),
(:Program {title: 'CompSci'}),
(:Program {title: 'Web Development'}),
(:Program {title: 'Theatre'}),
(:Program {title: 'Graphic Design'}),
(:Program {title: 'Photography'})

CREATE (:Outcome { name: 'Photoshop', desc: 'lorem ipsum' }),
(:Outcome { name: 'Public Speaking', desc: 'lorem ipsum' }),
(:Outcome { name: 'Acting', desc: 'lorem ipsum' }),
(:Outcome { name: 'Singing', desc: 'lorem ipsum' }),
(:Outcome { name: 'Illustration', desc: 'lorem ipsum' }),
(:Outcome { name: '3D Modeling', desc: 'lorem ipsum' }),
(:Outcome { name: 'B&W Photo Darkroom', desc: 'lorem ipsum' }),
(:Outcome { name: 'Analog Photography', desc: 'lorem ipsum' }),
(:Outcome { name: 'PostgreSQL', desc: 'lorem ipsum' }),
(:Outcome { name: 'MongoDB', desc: 'lorem ipsum' }),
(:Outcome { name: 'AngularJS', desc: 'lorem ipsum' }),
(:Outcome { name: 'Express', desc: 'lorem ipsum' }),
(:Outcome { name: 'React', desc: 'lorem ipsum' }),
(:Outcome { name: 'SASS', desc: 'lorem ipsum' }),
(:Outcome { name: 'HTML/CSS', desc: 'lorem ipsum' }),
(:Outcome { name: '<canvas>', desc: 'lorem ipsum' }),
(:Outcome { name: 'SVG', desc: 'lorem ipsum' }),
(:Outcome { name: 'Studio Lighting', desc: 'lorem ipsum' }),
(:Outcome { name: 'Beginning Metalwork', desc: 'lorem ipsum' }),
(:Outcome { name: 'TIG Welding', desc: 'lorem ipsum' }),
(:Outcome { name: 'MIG Welding', desc: 'lorem ipsum' }),
(:Outcome { name: 'CAD', desc: 'lorem ipsum' })

CREATE (:Offering {name: 'Front End Web Development', content: ['text','audio','video']}),
(:Offering {name: 'Improv', content: ['text','audio','video']}),
(:Offering {name: 'Musical Theatre', content: ['text','audio','video']}),
(:Offering {name: '2D Graphic Design', content: ['text','audio','video']}),
(:Offering {name: 'Studio Photography', content: ['text','audio','video']}),
(:Offering {name: 'Jewelry Making', content: ['text','audio','video']}),
(:Offering {name: 'Custom Bicycle Manufacturing', content: ['text','audio','video']})

MATCH (p:Program {title: 'Web Development'})
WITH p
MATCH (o:Outcome)
WHERE o.name = 'SVG'
OR o.name = '<canvas>'
OR o.name = 'HTML/CSS'
OR o.name = 'SASS'
OR o.name = 'Express'
OR o.name = 'PostgreSQL'
OR o.name = 'MongoDB'
OR o.name = 'AngularJS'
CREATE (p)-[:REQUIRES]->(o);

MATCH (p:Program {title: 'Theatre'})
WITH p
MATCH (o:Outcome)
WHERE o.name = 'Acting'
OR o.name = 'Singing'
OR o.name = 'Public Speaking'
CREATE (p)-[:REQUIRES]->(o)

MATCH (off:Offering {name: 'Front End Web Development'})
WITH off
MATCH (out:Outcome)
WHERE out.name = 'SASS'
OR out.name = 'React'
OR out.name = 'AngularJS'
OR out.name = '<canvas>'
OR out.name = 'SVG'
CREATE (off)-[:FULFILLS]->(out)

MATCH (off:Offering {name: 'Front End Web Development'})
WITH off
MATCH (out:Outcome {name: 'HTML/CSS'})
CREATE (off)-[:REQUIRES]->(out)

CREATE (:EDU {name: 'UT', full_name: 'University of Texas'})

MATCH (e:EDU),(p:Program {title: 'Web Development'})
CREATE (e)-[:PROVIDES]->(p)
