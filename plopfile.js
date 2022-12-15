const dedent = require('dedent')

// unicode range starts for low-align and center-align
const LOW_SHIFT = 0x100
const CENTER_SHIFT = 0x400

const UPM = 1000

const ZERO_CHAR = ` \t\xa0\`@`.split('').map(v=>v.charCodeAt(0))

// Core latin chars are 0
// All other chars are blank via last-resort method, see cmap https://github.com/adobe-fonts/adobe-blank-vf
const BLANK = [0x0A,0x0B,0x0C,0x0D,0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29,0x2B,0x2C,0x2F,0x3A,0x3B,0x3C,0x3D,0x3E,0x3F,0x5B,0x5C,0x5D,0x5E,0x7B,0x7D,0x7E,0x85,0xA1,0xA2,0xA3,0xA5,0xA7,0xA8,0xA9,0xAA,0xAB,0xAE,0xAF,0xB0,0xB4,0xB6,0xB7,0xB8,0xBA,0xBB,0xBF,0xC0,0xC1,0xC2,0xC3,0xC4,0xC5,0xC6,0xC7,0xC8,0xC9,0xCA,0xCB,0xCC,0xCD,0xCE,0xCF,0xD0,0xD1,0xD2,0xD3,0xD4,0xD5,0xD6,0xD7,0xD8,0xD9,0xDA,0xDB,0xDC,0xDD,0xDE,0xDF,0xE0,0xE1,0xE2,0xE3,0xE4,0xE5,0xE6,0xE7,0xE8,0xE9,0xEA,0xEB,0xEC,0xED,0xEE,0xEF,0xF0,0xF1,0xF2,0xF3,0xF4,0xF5,0xF6,0xF7,0xF8,0xF9,0xFA,0xFB,0xFC,0xFD,0xFE,0xFF,0x16C,0x16D,0x16E,0x16F,0x170,0x171,0x172,0x173,0x174,0x175,0x176,0x177,0x178,0x179,0x17A,0x17B,0x17C,0x17D,0x17E,0x218,0x219,0x21A,0x21B,0x237,0x2C6,0x2C7,0x2D8,0x2D9,0x2DA,0x2DB,0x2DC,0x2DD,0x303,0x304,0x306,0x307,0x308,0x30A,0x30B,0x30C,0x312,0x326,0x327,0x328,0x3f0,0x3f1,0x3f2,0x3f3,0x3f4,0x3f5,0x3f6,0x3f7,0x3f8,0x3f9,0x3fa,0x3fb,0x3fc,0x3fd,0x3fe,0x3ff,0x464,0x465,0x466,0x467,0x468,0x469,0x46a,0x46b,0x46c,0x46d,0x46e,0x46f,0x1680,0x180E,0x1E80,0x1E81,0x1E82,0x1E83,0x1E84,0x1E85,0x1E9E,0x1EF2,0x1EF3,0x2000,0x2001,0x2002,0x2003,0x2004,0x2005,0x2006,0x2007,0x2008,0x2009,0x200A,0x200B,0x200C,0x200D,0x2018,0x2019,0x201A,0x201C,0x201D,0x201E,0x2022,0x2026,0x2028,0x2029,0x202F,0x2039,0x203A,0x205F,0x2060,0x2061,0x2062,0x20AC,0x2122,0x2212,0x3000,0xFEFF]

const ONE_CHAR = `.*_ˍ`.split('').map(v=>v.charCodeAt(0)) //`.-–—―_¯ˉˍ˗‐‑‒‾⁃⁻₋−⎯⏤─➖⸺⸻𐆑`
const ONE_CENTERED = `-–—―`.split('').map(v=>v.charCodeAt(0))
const MAX_CHAR = [`|`].map(v=>v.charCodeAt(0)) //`|｜ǀ∣│।`

const BAR_CHAR = `▁▂▃▄▅▆▇█`.split('').map(v=>v.charCodeAt(0))

const FONTFACE = {
  wavefont100: {
    name: 'Wavefont',
    min: 0,
    max: 100,
    ascender: 110,
    descender: 10,
    alias: {
      0: [...ZERO_CHAR, ...BLANK],
      1: [...ONE_CHAR, BAR_CHAR[0]],
      14: [BAR_CHAR[1]], 28: [BAR_CHAR[2]], 42: [BAR_CHAR[3]], 56: [BAR_CHAR[4]], 72: [BAR_CHAR[5]], 86: [BAR_CHAR[6]],
      100: [...MAX_CHAR, BAR_CHAR[7]]
    },
    values: Array.from({length: 108}).map((v,i)=>(LOW_SHIFT + i)),
  }
}
FONTFACE.wavefont100.values.center = Array.from({length: 100}).map((v,i)=>(CENTER_SHIFT + i))
FONTFACE.wavefont100.alias.center = {
  1: ONE_CENTERED
}

// 0-9
'0123456789'.split('').map((c,i) => alias(i*10, c))

// a-zA-Z
alias(1,'a'), alias(2,'b'), alias(4,'c'),
alias(6,'d')
alias(8,'e'), alias(10,'f'), alias(12,'g'), alias(14,'h'), alias(16,'i'), alias(18,'j'), alias(20,'k'), alias(22,'l'), alias(24,'m'), alias(26,'n'), alias(28,'o'), alias(30,'p'), alias(32,'q'), alias(34,'r'),
alias(36,'s')
, alias(38,'t')
alias(40,'u')
alias(42,'v'), alias(44,'w'), alias(46,'x')
alias(48,'y'), alias(50,'z')
alias(52,'A'), alias(54,'B'), alias(56,'C'), alias(58,'D'), alias(60,'E'), alias(62,'F'), alias(64,'G'), alias(66,'H'), alias(68,'I'), alias(70,'J'), alias(72,'K'), alias(74,'L'), alias(76,'M'), alias(78,'N'), alias(80,'O'), alias(82,'P'), alias(84,'Q'), alias(86,'R'), alias(88,'S'), alias(90,'T'), alias(92,'U'), alias(94,'V'), alias(96,'W'), alias(98,'X'), alias(99,'Y'), alias(100,'Z')



// add alias to wavefont100
function alias(value, char) {
  (FONTFACE.wavefont100.alias[value]||=[]).push(char.charCodeAt(0))
}

// axes definition, per https://github.com/dy/wavefont/issues/42
const AXES = {
  roundness: {tag: 'ROND', min: 0, max: 100, default: 0},
  weight: {tag: 'wght', min: 1, max: 400, default: 400}
}

// create masters
const MASTERS = {
  'w1r0': {weight: AXES.weight.min, roundness: AXES.roundness.min},
  'w1r100': {weight: AXES.weight.min, roundness: AXES.roundness.max},
  'w400r0': {weight: AXES.weight.max, roundness: AXES.roundness.min},
  'w400r100': {weight: AXES.weight.max, roundness: AXES.roundness.max}
}

module.exports = function (plop) {
	plop.setGenerator('build-ufo', {
    description: 'Build font-face UFOs',
    prompts: [{name: 'faceName', message: 'font-face name', type: 'text'}],
		actions: ({faceName}) => {
      const face = FONTFACE[faceName], axes = AXES, masters = MASTERS

      // convert value to units-per-em (0-100 → 0-upm)
      const upm = (v) => (UPM * v / face.max)
      // int to hex
      const hex = (v) => v.toString(16).toUpperCase()
      // int to u0000 form
      const uni = (v) => (Array.isArray(v) ? v : [v]).map(v => `u${hex(parseInt(v)).padStart(4,0)}`).join(',')

      // uni 1 → uni0001
      plop.setHelper('uni', uni);

      // upm 12 → 120 (value to upm)
      plop.setHelper('upm', upm);

      // hex 12 -> C
      plop.setHelper('hex', hex);

      // sub 1 2 → -1
      plop.setHelper('sub', (a,b) => a-b);

      // half 1 → .5
      plop.setHelper('half', (a) => a*.5);

      // int 12.3 → 12
      plop.setHelper('int', v => v.toFixed(0));

      // {{#times N}}{{@index}}{{/times}}
      plop.setHelper('times', function(n, block) {
        var accum = '';
        for(var i = 0; i < n; ++i) {
            block.data.index = i;
            block.data.first = i === 0;
            block.data.last = i === (n - 1);
            accum += block.fn(this);
        }
        return accum;
      });

      // clip values are more horizontal than vertical - need alternative glyph
      const clips = face.values.filter((c, v) => upm(v) < AXES.weight.max);

      return [
        // populate source skeleton
        {
          type: 'addMany',
          force: true,
          destination: `sources/`,
          base: '_sources',
          templateFiles: '_sources/*',
          data: { face, masters, axes, clips }
        },
        ...Object.keys(masters).map(name => master({name, ...masters[name]})).flat()
      ]

      // actions to build one master file
      function master({name, weight, roundness}){
        const radius = roundness / 2
        const width = weight
        const destination = `sources/${face.name}-${name.replace(" ","")}.ufo`

        return [
          // ufo skeleton
          {
            type: 'addMany',
            force: true,
            destination: `${destination}/`,
            base: '_sources/master.ufo',
            templateFiles: '_sources/master.ufo/**/*',
            data: { width, weight, radius, axes, face, clips }
          },
          // caps
          {
            force: true,
            type: 'add',
            path: `${destination}/glyphs/cap.glif`,
            template: cap({height: radius*.01*weight*2, width:0, radius: radius*.01*weight, weight, name: 'cap', align: 0 })
          },
          // values
          ...face.values.map((code, value) => ({
            force: true,
            type: 'add',
            path: `${destination}/glyphs/_${value}.glif`,
            template: bar({value, code, weight, width, name: `_${value}`, capSize: radius*.01*weight, align: 0, alias: face.alias[value] })
          })),
          // substitute glyphs lower than max weight to compensate wrong interpolation on weight clipping
          // the logic: big weights would have big radius, but since it's limited to value, we interpolate between wrong 1 weight and max weight
          ...clips.map((code, value) => value && ({
            force: true,
            type: 'add',
            path: `${destination}/glyphs/_${value}.clip.glif`,
            template: cap({height: upm(value), weight, width, name: `_${value}.clip`, radius: (radius && 1 ) * upm(value) * .5, align: 0 })
          })).filter(Boolean),

          // centered values in cyrillic range
          ...face.values.center.map((code, value) => ({
            force: true,
            type: 'add',
            path: `${destination}/glyphs/_${value}.center.glif`,
            template: bar({value, code, weight, width, name: `_${value}.center`, capSize: radius*.01*weight, align: 0.5, alias: face.alias.center[value] })
          })),
          ...clips.map((code, value) => value && ({
            force: true,
            type: 'add',
            path: `${destination}/glyphs/_${value}.clip.center.glif`,
            template: cap({height: upm(value), weight, width, name: `_${value}.clip.center`, radius: (radius && 1 ) * upm(value) * .5, align: 0.5 })
          })).filter(Boolean)
        ]
      }

      // cap glyph builder
      function cap({width, weight, height, name, code, radius:R, align}) {
        // bezier curve shift to approximate border-radius
        const Rc = R * (1 - .55), yshift = (UPM - height) * align, l = 0, r = weight

        return dedent`
          <?xml version="1.0" encoding="UTF-8"?>
          <glyph name="${name}" format="2">
            <advance width="${width}"/>
            ${code ? `<unicode hex="{{hex ${code} }}"/>` : ``}
            <outline>
              <contour>
                  <point x="${l}" y="${height-Rc + yshift}"/>

                  <point x="${l+Rc}" y="${height + yshift}"/>
                  <point x="${l+R}" y="${height + yshift}" type="curve" smooth="yes"/>
                  <point x="${r-R}" y="${height + yshift}" type="line"/>
                  <point x="${r-Rc}" y="${height + yshift}"/>

                  <point x="${r}" y="${height-Rc + yshift}"/>
                  <point x="${r}" y="${height-R + yshift}" type="curve" smooth="yes"/>
                  <point x="${r}" y="${R + yshift}" type="line"/>
                  <point x="${r}" y="${Rc + yshift}"/>

                  <point x="${r-Rc}" y="${0 + yshift}"/>
                  <point x="${r-R}" y="${0 + yshift}" type="curve" smooth="yes"/>
                  <point x="${l+R}" y="${0 + yshift}" type="line"/>
                  <point x="${l+Rc}" y="${0 + yshift}"/>

                  <point x="${l}" y="${Rc + yshift}"/>
                  <point x="${l}" y="${R + yshift}" type="curve" smooth="yes"/>
                  <point x="${l}" y="${height-R + yshift}" type="line"/>
              </contour>
            </outline>
          </glyph>
        `
      }

      // bar glyph builder
      function bar({value, code, width, weight, capSize, name, align, alias}) {
        const yshift = upm((face.max - value) * align), l = 0, r = weight
        return dedent`
          <?xml version="1.0" encoding="UTF-8"?>
          <glyph name="${name}" format="2">
            <advance width="${width}"/>
            ${code ? `<unicode hex="{{hex ${code} }}"/>` : ``}
            ${alias?.map(code => `<unicode hex="{{hex ${code} }}"/>`).join('') || ``}
            ${value ? `<outline>
              <component base="cap" xOffset="0" yOffset="{{int ${yshift}}}" />
              <component base="cap" xOffset="0" yOffset="{{int ${upm(value) - capSize*2 + yshift}}}" />
              <contour>
                <point x="{{int ${l}}}" y="{{int ${yshift + capSize}}}" type="line"/>
                <point x="{{int ${l}}}" y="{{int ${upm(value) + yshift - capSize}}}" type="line"/>
                <point x="{{int ${r}}}" y="{{int ${upm(value) + yshift - capSize}}}" type="line"/>
                <point x="{{int ${r}}}" y="{{int ${yshift + capSize}}}" type="line"/>
              </contour>
            </outline>` : ``}
          </glyph>
        `
      }
    }
  });
}
