import { useState } from 'react'
import './App.css'
import icono from './assets/img/icono.png'
import domtoimage from 'dom-to-image'

const WEEKS_PER_MONTH = 4.33
const MINIMUM_SALARY = 372400

const SUBTE_TRIPS = [
  { maxTrips: 20, fare: 1684.00 },
  { maxTrips: 30, fare: 1347.20 },
  { maxTrips: 40, fare: 1178.80 },
  { maxTrips: Infinity, fare: 1010.40 }
]

const LINE_338_FARES = [
  { id: 'min', label: 'Mínimo', fare: 905.00 },
  { id: 'v在外', label: 'La Plata - Cruce Varela', fare: 1240.00 },
  { id: 'lz', label: 'La Plata - Lomas de Zamora', fare: 1850.00 },
  { id: 'mh', label: 'La Plata - Morón/Haedo', fare: 2420.00 },
  { id: 'si', label: 'La Plata - San Isidro', fare: 3150.00 }
]

const TRANSPORT_TYPES = {
  subte: {
    label: 'Subte',
    lines: [
      { id: 'subte-a', label: 'Línea A' },
      { id: 'subte-b', label: 'Línea B' },
      { id: 'subte-c', label: 'Línea C' },
      { id: 'subte-d', label: 'Línea D' },
      { id: 'subte-e', label: 'Línea E' },
      { id: 'subte-h', label: 'Línea H' },
      { id: 'subte-pre', label: 'Premetro' }
    ]
  },
  tren: {
    label: 'Tren',
    lines: [
      { id: 'tren-sarmiento', label: 'Sarmiento' },
      { id: 'tren-mitre', label: 'Mitre' },
      { id: 'tren-sm', label: 'San Martín' },
      { id: 'tren-roca', label: 'Roca' },
      { id: 'tren-belgrano-n', label: 'Belgrano Norte' },
      { id: 'tren-belgrano-s', label: 'Belgrano Sur' },
      { id: 'tren-urquiza', label: 'Urquiza' }
    ]
  },
  colectivo: {
    label: 'Colectivo',
    lines: []
  }
}

const LINE_TO_CATEGORY = {
  4: 'cabac', 6: 'cabac', 7: 'cabac', 12: 'cabac', 23: 'cabac',
  25: 'cabac', 26: 'cabac', 34: 'cabac', 39: 'cabac', 42: 'cabac',
  44: 'cabac', 47: 'cabac', 50: 'cabac', 61: 'cabac', 62: 'cabac',
  64: 'cabac', 65: 'cabac', 68: 'cabac', 76: 'cabac', 84: 'cabac',
  90: 'cabac', 99: 'cabac', 102: 'cabac', 106: 'cabac', 107: 'cabac',
  108: 'cabac', 109: 'cabac', 115: 'cabac', 118: 'cabac', 132: 'cabac',
  151: 'cabac',
  338: 'line338',
  1: 'nation', 2: 'nation', 8: 'nation', 9: 'nation', 10: 'nation',
  15: 'nation', 17: 'nation', 19: 'nation', 20: 'nation', 21: 'nation',
  22: 'nation', 24: 'nation', 28: 'nation', 29: 'nation', 31: 'nation',
  32: 'nation', 33: 'nation', 37: 'nation', 41: 'nation', 45: 'nation',
  46: 'nation', 49: 'nation', 51: 'nation', 53: 'nation', 55: 'nation',
  56: 'nation', 57: 'nation', 59: 'nation', 60: 'nation', 63: 'nation',
  67: 'nation', 70: 'nation', 71: 'nation', 74: 'nation', 78: 'nation',
  79: 'nation', 80: 'nation', 85: 'nation', 86: 'nation', 87: 'nation',
  88: 'nation', 91: 'nation', 92: 'nation', 93: 'nation', 95: 'nation',
  96: 'nation', 97: 'nation', 98: 'nation', 100: 'nation', 101: 'nation',
  103: 'nation', 105: 'nation', 110: 'nation', 111: 'nation', 113: 'nation',
  114: 'nation', 117: 'nation', 119: 'nation', 123: 'nation', 124: 'nation',
  126: 'nation', 127: 'nation', 128: 'nation', 129: 'nation', 130: 'nation',
  133: 'nation', 134: 'nation', 135: 'nation', 136: 'nation', 140: 'nation',
  143: 'nation', 145: 'nation', 146: 'nation', 148: 'nation', 150: 'nation',
  153: 'nation', 154: 'nation', 158: 'nation', 159: 'nation', 160: 'nation',
  161: 'nation', 163: 'nation', 164: 'nation', 166: 'nation', 168: 'nation',
  169: 'nation', 172: 'nation', 176: 'nation', 177: 'nation', 178: 'nation',
  179: 'nation', 180: 'nation', 181: 'nation', 182: 'nation', 184: 'nation',
  185: 'nation', 188: 'nation', 193: 'nation', 194: 'nation', 195: 'nation',
  197: 'nation',
  200: 'pba', 202: 'pba', 203: 'pba', 204: 'pba', 205: 'pba', 206: 'pba',
  214: 'pba', 215: 'pba', 218: 'pba', 219: 'pba', 222: 'pba', 225: 'pba',
  228: 'pba', 236: 'pba', 237: 'pba', 238: 'pba', 239: 'pba', 242: 'pba',
  244: 'pba', 245: 'pba', 247: 'pba', 252: 'pba', 253: 'pba', 256: 'pba',
  257: 'pba', 263: 'pba', 264: 'pba', 266: 'pba', 269: 'pba', 271: 'pba',
  273: 'pba', 275: 'pba', 276: 'pba', 277: 'pba', 278: 'pba', 281: 'pba',
  283: 'pba', 284: 'pba', 288: 'pba', 291: 'pba', 293: 'pba', 295: 'pba',
  297: 'pba', 298: 'pba', 299: 'pba', 300: 'pba', 302: 'pba', 303: 'pba',
  306: 'pba', 307: 'pba', 310: 'pba', 311: 'pba', 312: 'pba', 313: 'pba',
  314: 'pba', 315: 'pba', 317: 'pba', 318: 'pba', 320: 'pba', 321: 'pba',
  322: 'pba', 323: 'pba', 324: 'pba', 325: 'pba', 326: 'pba', 327: 'pba',
  328: 'pba', 329: 'pba', 336: 'pba', 341: 'pba', 343: 'pba', 350: 'pba',
  354: 'pba', 355: 'pba', 365: 'pba', 370: 'pba', 371: 'pba', 372: 'pba',
  373: 'pba', 378: 'pba', 379: 'pba', 381: 'pba', 382: 'pba', 383: 'pba',
  384: 'pba', 385: 'pba', 386: 'pba', 388: 'pba', 390: 'pba', 391: 'pba',
  392: 'pba', 394: 'pba', 395: 'pba', 403: 'pba', 404: 'pba', 405: 'pba',
  406: 'pba', 410: 'pba', 414: 'pba', 418: 'pba', 422: 'pba', 429: 'pba',
  430: 'pba', 432: 'pba', 435: 'pba', 436: 'pba', 437: 'pba', 440: 'pba',
  441: 'pba', 443: 'pba', 445: 'pba', 448: 'pba', 449: 'pba', 461: 'pba',
  462: 'pba', 463: 'pba', 464: 'pba',
  500: 'pba', 501: 'pba', 502: 'pba', 503: 'pba', 504: 'pba', 505: 'pba',
  506: 'pba', 507: 'pba', 508: 'pba', 509: 'pba', 510: 'pba', 511: 'pba',
  512: 'pba', 513: 'pba', 514: 'pba', 515: 'pba', 518: 'pba', 520: 'pba',
  521: 'pba', 522: 'pba', 523: 'pba', 524: 'pba', 526: 'pba', 527: 'pba',
  540: 'pba', 541: 'pba', 542: 'pba', 543: 'pba', 544: 'pba', 548: 'pba',
  549: 'pba', 550: 'pba', 551: 'pba', 552: 'pba', 553: 'pba', 561: 'pba',
  562: 'pba', 564: 'pba', 580: 'pba', 582: 'pba', 583: 'pba', 584: 'pba',
  585: 'pba', 586: 'pba',
  603: 'pba', 619: 'pba', 620: 'pba', 621: 'pba', 622: 'pba', 624: 'pba',
  628: 'pba', 630: 'pba', 634: 'pba', 635: 'pba',
  670: 'pba',
  707: 'pba', 710: 'pba', 720: 'pba', 721: 'pba', 722: 'pba', 723: 'pba',
  740: 'pba', 741: 'pba', 749: 'pba'
}

const CATEGORY_FARES = {
  cabac: { '0-3': 852, '3-6': 947.71, '6-12': 1020.71, '12+': 1093.77 },
  nation: { '0-3': 742.81, '3-6': 861.66, '6-12': 1002.80, '12-27': 1151.36, '27+': 1337.06 },
  pba: { '0-3': 1111.19, '3-6': 1250.08, '6-12': 1388.98, '12-27': 1666.78, '27+': 1959.58 }
}

const TREN_FARES = { '0-12': 420, '12-24': 590, '24+': 730 }

const RED_SUBE_DISCOUNTS = [1, 0.5, 0.25]

const DISTANCE_OPTIONS_CABAC = [
  { id: '0-3', label: '0-3 km' },
  { id: '3-6', label: '3-6 km' },
  { id: '6-12', label: '6-12 km' },
  { id: '12+', label: '12+ km' }
]

const DISTANCE_OPTIONS_NATION = [
  { id: '0-3', label: '0-3 km' },
  { id: '3-6', label: '3-6 km' },
  { id: '6-12', label: '6-12 km' },
  { id: '12-27', label: '12-27 km' },
  { id: '27+', label: '27+ km' }
]

const DISTANCE_OPTIONS_PBA = [
  { id: '0-3', label: '0-3 km' },
  { id: '3-6', label: '3-6 km' },
  { id: '6-12', label: '6-12 km' },
  { id: '12-27', label: '12-27 km' },
  { id: '27+', label: '27+ km' }
]

const DISTANCE_OPTIONS_TREN = [
  { id: '0-12', label: '0-12 km' },
  { id: '12-24', label: '12-24 km' },
  { id: '24+', label: '24+ km' }
]

function getLineNumber(lineId) {
  const match = lineId?.match(/\d+/)
  return match ? parseInt(match[0]) : null
}

function getCategoryForLine(lineId) {
  const num = getLineNumber(lineId)
  if (num === null) return null
  return LINE_TO_CATEGORY[num] || null
}

function getCategoryLabel(category) {
  if (category === 'cabac') return 'CABA'
  if (category === 'pba') return 'PBA'
  if (category === 'nation') return 'Nación'
  if (category === 'line338') return 'Nación'
  return null
}

function formatDistance(distance) {
  return distance.replace('km', 'Km')
}

function App() {
  const [legs, setLegs] = useState([{ id: 1, type: null, line: null, distance: null }])
  const [daysPerWeek, setDaysPerWeek] = useState(5)
  const [result, setResult] = useState(null)
  const [editingLegId, setEditingLegId] = useState(null)

  const addLeg = () => {
    if (legs.length >= 5) return
    const newId = Math.max(...legs.map(l => l.id)) + 1
    setLegs([...legs, { id: newId, type: null, line: null, distance: null }])
    setEditingLegId(newId)
  }

  const removeLeg = (id) => {
    if (legs.length <= 1) return
    setLegs(legs.filter(l => l.id !== id))
  }

  const updateLeg = (id, field, value) => {
    setLegs(legs.map(leg => {
      if (leg.id !== id) return leg
      const updated = { ...leg, [field]: value }
      if (field === 'type') {
        updated.line = null
        updated.distance = null
      }
      if (field === 'line') {
        updated.distance = null
      }
      return updated
    }))
  }

  const getDistanceOptions = (leg) => {
    if (!leg.type || !leg.line) return []
    if (leg.type === 'tren') return DISTANCE_OPTIONS_TREN
    if (leg.type === 'subte') return []
    const category = getCategoryForLine(leg.line) || 'nation'
    if (category === 'cabac') return DISTANCE_OPTIONS_CABAC
    if (category === 'nation') return DISTANCE_OPTIONS_NATION
    if (category === 'pba') return DISTANCE_OPTIONS_PBA
    return DISTANCE_OPTIONS_NATION
  }

  const isCABAOnlyColectivo = (lineId) => {
    const category = getCategoryForLine(lineId)
    return category === 'cabac'
  }

  const getSubteVolumeFare = (totalSubteTrips) => {
    for (const tier of SUBTE_TRIPS) {
      if (totalSubteTrips <= tier.maxTrips) {
        return tier.fare
      }
    }
    return SUBTE_TRIPS[SUBTE_TRIPS.length - 1].fare
  }

  const calculate = () => {
    let subePosition = 0
    let subteTripsCount = daysPerWeek * 2 * 4
    const legResults = []

    for (const leg of legs) {
      if (!leg.type || !leg.line) continue
      if (leg.type !== 'subte' && !leg.distance) continue

      let fare = 0
      let label = ''
      let discount = null

      if (leg.type === 'subte') {
        fare = getSubteVolumeFare(subteTripsCount)
        label = `🚇 ${TRANSPORT_TYPES.subte.lines.find(l => l.id === leg.line)?.label}`
        discount = null
      } else if (leg.type === 'tren') {
        fare = TREN_FARES[leg.distance] || 0
        label = `🚄 ${TRANSPORT_TYPES.tren.lines.find(l => l.id === leg.line)?.label} • ${formatDistance(leg.distance)}`
        discount = null
      } else if (leg.type === 'colectivo') {
        const category = getCategoryForLine(leg.line)
        if (category === 'line338') {
          fare = LINE_338_FARES.find(f => f.id === leg.distance)?.fare || 0
          label = `🚌 Línea 338 • ${formatDistance(leg.distance)} • ${getCategoryLabel(category)}`
        } else {
          fare = CATEGORY_FARES[category || 'nation']?.[leg.distance] || 0
          if (isCABAOnlyColectivo(leg.line)) {
            discount = RED_SUBE_DISCOUNTS[subePosition]
            fare = fare * discount
            subePosition++
          }
          const lineNum = getLineNumber(leg.line)
          label = `🚌 Línea ${lineNum} • ${formatDistance(leg.distance)} • ${getCategoryLabel(category || 'nation')}`
        }
      }

      legResults.push({ ...leg, fare, label, discount })
    }

    const subteVolumeFare = getSubteVolumeFare(subteTripsCount)
    let adjustedTotal = 0
    for (const lr of legResults) {
      if (lr.type === 'subte') {
        adjustedTotal += subteVolumeFare
      } else {
        adjustedTotal += lr.fare
      }
    }

    const dailyTotal = adjustedTotal * 2
    const weeklyTotal = dailyTotal * daysPerWeek
    const monthlyTotal = weeklyTotal * WEEKS_PER_MONTH

    setResult({
      perTrip: adjustedTotal,
      daily: dailyTotal,
      weekly: weeklyTotal,
      monthly: Math.round(monthlyTotal),
      legs: legResults,
      subteVolumeFare
    })
  }

const shareCard = async () => {
  const card = document.getElementById('share-card')
  if (!card) return
  try {
    const dataUrl = await domtoimage.toPng(card, {
      backgroundColor: '#ffffff',
      pixelRatio: 2
    })
    const blob = await (await fetch(dataUrl)).blob()
    if (blob && navigator.share) {
      const file = new File([blob], 'costo-cursada.png', { type: 'image/png' })
      await navigator.share({
        files: [file],
        title: 'Costo de cursada',
        text: 'Cada vez cuesta más cursar'
      })
    }
  } catch (err) {
    console.error('Error sharing:', err)
  }
}
  const isValid = legs.every(leg => {
    if (!leg.type || !leg.line) return false
    if (leg.type === 'subte') return true
    return !!leg.distance
  })

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl shadow-2xl bg-white font-['Nunito']">
        <div className="bg-[#E31E24] px-6 py-5 flex items-center gap-3">
          <img src={icono} alt="SUBE" className="w-12 h-12 object-contain" />
          <div>
            <p className="text-white/80 text-xs font-semibold tracking-wider uppercase">$i$tema Único de Boleto Electrónico</p>
            <h1 className="text-white font-bold text-xl">¿Cuánto me cuesta ir a la facu?</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-[#2D2D2D] mb-3 uppercase tracking-wider">
              Tu viaje
            </h2>

            <div className="space-y-3">
              {legs.map((leg, index) => (
                <div key={leg.id} className="flex items-center gap-3">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setEditingLegId(editingLegId === leg.id ? null : leg.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 ${
                        leg.type && leg.line && (leg.type === 'subte' || leg.distance)
                          ? 'bg-[#E31E24] text-white'
                          : 'bg-[#E31E24]/10 text-[#E31E24] border-2 border-dashed border-[#E31E24]/40'
                      }`}
                    >
                      {index + 1}
                    </button>
                    {leg.type && leg.line && (
                      <button
                        type="button"
                        onClick={() => removeLeg(leg.id)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#2D2D2D] text-white rounded-full text-xs flex items-center justify-center hover:bg-black"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {leg.type && leg.line && (leg.type === 'subte' || leg.distance) ? (
                    <div className="flex-1 bg-[#F5F5F5] rounded-lg px-4 py-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-[#2D2D2D]">
                        {leg.type === 'subte' && `🚇 ${TRANSPORT_TYPES.subte.lines.find(l => l.id === leg.line)?.label}`}
                        {leg.type === 'tren' && `🚄 ${TRANSPORT_TYPES.tren.lines.find(l => l.id === leg.line)?.label} • ${formatDistance(leg.distance)}`}
                        {leg.type === 'colectivo' && `🚌 Línea ${getLineNumber(leg.line)} • ${formatDistance(leg.distance)} • ${getCategoryLabel(getCategoryForLine(leg.line) || 'nation')}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingLegId(leg.id)}
                        className="text-[#E31E24] text-xs font-semibold hover:underline"
                      >
                        Editar
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-[#2D2D2D]/60">
                      {editingLegId === leg.id ? 'Completá los datos' : 'Tocá para seleccionar'}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {editingLegId && (
              <div className="mt-3 p-4 bg-[#F5F5F5] rounded-lg space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D2D2D]/70 mb-1 uppercase tracking-wider">
                    Tipo de transporte
                  </label>
                  <select
                    value={legs.find(l => l.id === editingLegId)?.type || ''}
                    onChange={(e) => updateLeg(editingLegId, 'type', e.target.value || null)}
                    className="w-full px-3 py-2 rounded-lg border-2 border-[#E31E24]/20 focus:border-[#E31E24] outline-none text-[#2D2D2D] bg-white"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="subte">Subte</option>
                    <option value="tren">Tren</option>
                    <option value="colectivo">Colectivo</option>
                  </select>
                </div>

                {legs.find(l => l.id === editingLegId)?.type === 'subte' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#2D2D2D]/70 mb-1 uppercase tracking-wider">
                      Línea de subte
                    </label>
                    <select
                      value={legs.find(l => l.id === editingLegId)?.line || ''}
                      onChange={(e) => updateLeg(editingLegId, 'line', e.target.value || null)}
                      className="w-full px-3 py-2 rounded-lg border-2 border-[#E31E24]/20 focus:border-[#E31E24] outline-none text-[#2D2D2D] bg-white"
                    >
                      <option value="">Seleccionar...</option>
                      {TRANSPORT_TYPES.subte.lines.map(line => (
                        <option key={line.id} value={line.id}>{line.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {legs.find(l => l.id === editingLegId)?.type === 'tren' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#2D2D2D]/70 mb-1 uppercase tracking-wider">
                      Línea de tren
                    </label>
                    <select
                      value={legs.find(l => l.id === editingLegId)?.line || ''}
                      onChange={(e) => updateLeg(editingLegId, 'line', e.target.value || null)}
                      className="w-full px-3 py-2 rounded-lg border-2 border-[#E31E24]/20 focus:border-[#E31E24] outline-none text-[#2D2D2D] bg-white"
                    >
                      <option value="">Seleccionar...</option>
                      {TRANSPORT_TYPES.tren.lines.map(line => (
                        <option key={line.id} value={line.id}>{line.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {legs.find(l => l.id === editingLegId)?.type === 'colectivo' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#2D2D2D]/70 mb-1 uppercase tracking-wider">
                        Número de línea
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="999"
                        value={getLineNumber(legs.find(l => l.id === editingLegId)?.line) || ''}
                        onChange={(e) => {
                          const num = parseInt(e.target.value)
                          if (e.target.value === '') {
                            updateLeg(editingLegId, 'line', null)
                          } else if (num > 999) {
                            return
                          } else {
                            updateLeg(editingLegId, 'line', `col-${num}`)
                          }
                        }}
                        placeholder="Ej: 152"
                        className="w-full px-3 py-2 rounded-lg border-2 border-[#E31E24]/20 focus:border-[#E31E24] outline-none text-[#2D2D2D]"
                      />
                      {getLineNumber(legs.find(l => l.id === editingLegId)?.line) > 999 && (
                        <p className="text-xs text-[#E31E24] mt-1">Ingresá una línea válida (1-999)</p>
                      )}
                    </div>

                    {getCategoryForLine(legs.find(l => l.id === editingLegId)?.line) === 'line338' && (
                      <div>
                        <label className="block text-xs font-semibold text-[#2D2D2D]/70 mb-1 uppercase tracking-wider">
                          Trayecto
                        </label>
                        <select
                          value={legs.find(l => l.id === editingLegId)?.distance || ''}
                          onChange={(e) => updateLeg(editingLegId, 'distance', e.target.value || null)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-[#E31E24]/20 focus:border-[#E31E24] outline-none text-[#2D2D2D] bg-white"
                        >
                          <option value="">Seleccionar...</option>
                          {LINE_338_FARES.map(f => (
                            <option key={f.id} value={f.id}>{f.label} - ${f.fare.toLocaleString('es-AR')}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}

                {legs.find(l => l.id === editingLegId)?.line && getDistanceOptions(legs.find(l => l.id === editingLegId)).length > 0 && getCategoryForLine(legs.find(l => l.id === editingLegId)?.line) !== 'line338' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#2D2D2D]/70 mb-1 uppercase tracking-wider">
                      Distancia
                    </label>
                    <select
                      value={legs.find(l => l.id === editingLegId)?.distance || ''}
                      onChange={(e) => updateLeg(editingLegId, 'distance', e.target.value || null)}
                      className="w-full px-3 py-2 rounded-lg border-2 border-[#E31E24]/20 focus:border-[#E31E24] outline-none text-[#2D2D2D] bg-white"
                    >
                      <option value="">Seleccionar...</option>
                      {getDistanceOptions(legs.find(l => l.id === editingLegId)).map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setEditingLegId(null)}
                  className="w-full bg-[#E31E24] text-white font-semibold py-2 rounded-lg hover:bg-[#c41a1f] transition-colors"
                >
                  Listo
                </button>
              </div>
            )}

            {legs.length < 5 && (
              <button
                type="button"
                onClick={addLeg}
                className="w-full mt-3 py-2 border-2 border-dashed border-[#E31E24]/30 text-[#E31E24] font-semibold rounded-lg hover:border-[#E31E24] hover:bg-[#E31E24]/5 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">+</span> Agregar tramo
              </button>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#2D2D2D] mb-3 uppercase tracking-wider">
              Días por semana
            </h2>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setDaysPerWeek(day)}
                  className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    daysPerWeek === day
                      ? 'bg-[#E31E24] text-white'
                      : 'bg-[#F5F5F5] text-[#2D2D2D] hover:bg-[#E31E24]/10'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            </div>

          <button
            type="button"
            onClick={calculate}
            disabled={!isValid}
            className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg transition-all ${
              isValid
                ? 'bg-[#E31E24] text-white hover:bg-[#c41a1f] active:bg-[#a81619] shadow-[#E31E24]/30 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:ring-offset-2'
                : 'bg-[#E31E24]/30 text-white/70 cursor-not-allowed'
            }`}
          >
            Calcular
          </button>

          {result && (
            <>
              <div id="share-card" className="hidden">
                <div className="bg-white p-6 font-['Nunito']" style={{ width: 400 }}>
                  <div className="bg-[#E31E24] px-4 py-3 flex items-center gap-2 rounded-t-lg">
                    <img src={icono} alt="SUBE" className="w-8 h-8 object-contain" />
                    <p className="text-white/80 text-xs font-semibold tracking-wider">Sistema Único de Boleto Electrónico</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <h2 className="text-xl font-bold text-[#E31E24] text-center">Cada vez cuesta más cursar</h2>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-[#F5F5F5] rounded-lg p-2">
                        <p className="text-[10px] text-[#2D2D2D]/60">Diario</p>
                        <p className="font-bold text-[#E31E24]">${result.daily.toLocaleString('es-AR')}</p>
                      </div>
                      <div className="bg-[#F5F5F5] rounded-lg p-2">
                        <p className="text-[10px] text-[#2D2D2D]/60">Semanal</p>
                        <p className="font-bold text-[#E31E24]">${result.weekly.toLocaleString('es-AR')}</p>
                      </div>
                      <div className="bg-[#F5F5F5] rounded-lg p-2">
                        <p className="text-[10px] text-[#2D2D2D]/60">Mensual</p>
                        <p className="font-bold text-[#E31E24]">${result.monthly.toLocaleString('es-AR')}</p>
                      </div>
                    </div>
                    <div className="text-xs space-y-1">
                      {result.legs.map((leg, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-[#2D2D2D]/80">{leg.label}</span>
                          <span className="font-semibold text-[#2D2D2D]">${leg.fare.toLocaleString('es-AR')}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-2">
                      <p className="text-xs text-[#2D2D2D]/60">Por mes gastás {Math.round((result.monthly / MINIMUM_SALARY) * 100)}% del Salario Mínimo en viajar a la facu</p>
                    </div>
                    <p className="text-xs font-bold text-[#2D2D2D]">¿Te acordás <span className="text-[#E31E24]">2024</span>? El café con dos medialunas más barato valía <span className="text-[#E31E24]">$150</span></p>
                    <p className="text-xs text-[#2D2D2D]">En <span className="text-[#E31E24] font-bold">2026</span> vale <span className="font-bold">$1200</span> y podés comprar <span className="font-bold text-[#E31E24]">{Math.floor(result.monthly / 1200)} cafés con {Math.floor(result.monthly / 1200) * 2} medialunas</span> con lo que gastás en transporte a la facu!</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {result && (
            <div className="pt-4 border-t-2 border-[#E31E24]/10">
              <div className="bg-[#F5F5F5] rounded-xl p-5 space-y-4">
                <div>
                  <p className="text-xs text-[#2D2D2D]/60 uppercase tracking-wider mb-1">Por viaje</p>
                  <p className="text-2xl font-bold text-[#2D2D2D]">
                    ${result.perTrip.toLocaleString('es-AR')}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-[#2D2D2D]/60 uppercase tracking-wider mb-1">Diario</p>
                    <p className="text-lg font-bold text-[#E31E24]">
                      ${result.daily.toLocaleString('es-AR')}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-[#2D2D2D]/60 uppercase tracking-wider mb-1">Semanal</p>
                    <p className="text-lg font-bold text-[#E31E24]">
                      ${result.weekly.toLocaleString('es-AR')}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-[#2D2D2D]/60 uppercase tracking-wider mb-1">Mensual</p>
                    <p className="text-lg font-bold text-[#E31E24]">
                      ${result.monthly.toLocaleString('es-AR')}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2D2D2D]/10">
                  <p className="text-xs text-[#2D2D2D]/60 uppercase tracking-wider mb-2">Desglose</p>
                  <div className="space-y-1">
                    {result.legs.map((leg, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-[#2D2D2D]/80">
                          {leg.label}
                          {leg.discount && leg.discount < 1 && (
                            <span className="text-[#E31E24] text-xs ml-1">
                              ({Math.round((1 - leg.discount) * 100)}% off)
                            </span>
                          )}
                        </span>
                        <span className="font-semibold text-[#2D2D2D]">
                          ${leg.fare.toLocaleString('es-AR')}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm pt-1 border-t border-[#2D2D2D]/10">
                      <span className="text-[#2D2D2D] font-semibold">Total por viaje</span>
                      <span className="font-bold text-[#E31E24]">${result.perTrip.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="pt-3 border-t border-[#2D2D2D]/10">
                      <div className="flex justify-between text-xs text-[#2D2D2D]/60 mb-1">
                        <span>Por mes gastás {Math.round((result.monthly / MINIMUM_SALARY) * 100)}% del Salario Mínimo en viajar a la facu</span>
                      </div>
                      <div className="w-full h-2 bg-[#E31E24]/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#E31E24] rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((result.monthly / MINIMUM_SALARY) * 100, 100)}%` }}
                        />
                      </div>
                      <p className="text-sm font-bold text-[#2D2D2D] mt-3">
                        ¿Te acordás <span className="text-[#E31E24]">2024</span>? El café con dos medialunas más barato de la Ciudad valía <span className="text-[#E31E24]">$150</span> pesos.
                      </p>
                      <p className="text-sm text-[#2D2D2D] mt-1">
                        En <span className="text-[#E31E24] font-bold">2026</span> el café con dos medialunas más barato lo encontrás en el mismo lugar, vale <span className="font-bold">$1200</span> y podés comprar <span className="font-bold text-[#E31E24] text-base">{Math.floor(result.monthly / 1200)} cafés con {Math.floor(result.monthly / 1200) * 2} medialunas</span> con lo que gastás en transporte a la facu!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={shareCard}
                      className="w-full mt-4 py-3 rounded-lg font-bold text-sm bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:opacity-90 transition-opacity"
                    >
                      📸 Compartir en Instagram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App