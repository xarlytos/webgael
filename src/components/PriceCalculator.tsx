import { useState, useEffect } from 'react';
import { Calculator, Clock, Package, Palette, Layers, Zap } from 'lucide-react';

interface PriceCalculatorProps {
  onPriceUpdate: (price: number, time: string) => void;
  onMaterialChange: (material: string, color: string) => void;
}

interface MaterialOption {
  id: string;
  name: string;
  basePrice: number; // € per cm³
  timeMultiplier: number; // hours per cm³
  colors: string[];
  description: string;
}

const materials: MaterialOption[] = [
  {
    id: 'pla',
    name: 'PLA',
    basePrice: 0.15,
    timeMultiplier: 0.8,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
    description: 'Material biodegradable, fácil de imprimir, ideal para prototipos'
  },
  {
    id: 'petg',
    name: 'PETG',
    basePrice: 0.18,
    timeMultiplier: 0.9,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
    description: 'Resistente, transparente, perfecto para piezas funcionales'
  },
  {
    id: 'abs',
    name: 'ABS',
    basePrice: 0.20,
    timeMultiplier: 1.0,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
    description: 'Muy resistente, ideal para piezas mecánicas'
  },
  {
    id: 'resina',
    name: 'Resina',
    basePrice: 0.35,
    timeMultiplier: 0.6,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
    description: 'Alta resolución, acabado perfecto, ideal para miniaturas'
  }
];

const finishOptions = [
  { id: 'raw', name: 'Sin acabado', price: 0, time: 0 },
  { id: 'sanded', name: 'Lijado básico', price: 5, time: 0.5 },
  { id: 'polished', name: 'Pulido', price: 15, time: 1 },
  { id: 'painted', name: 'Pintado', price: 25, time: 2 }
];

export function PriceCalculator({ onPriceUpdate, onMaterialChange }: PriceCalculatorProps) {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedColor, setSelectedColor] = useState(materials[0].colors[0]);
  const [selectedFinish, setSelectedFinish] = useState(finishOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [volume, setVolume] = useState(10); // cm³ - esto se calcularía del archivo 3D
  const [infill, setInfill] = useState(20); // porcentaje
  const [layerHeight, setLayerHeight] = useState(0.2); // mm

  const calculatePrice = () => {
    const baseVolume = volume * (infill / 100);
    const materialCost = baseVolume * selectedMaterial.basePrice * quantity;
    const finishCost = selectedFinish.price * quantity;
    const totalPrice = materialCost + finishCost;
    
    return Math.max(totalPrice, 5); // Precio mínimo de €5
  };

  const calculateTime = () => {
    const baseVolume = volume * (infill / 100);
    const materialTime = baseVolume * selectedMaterial.timeMultiplier * quantity;
    const finishTime = selectedFinish.time * quantity;
    const totalTime = materialTime + finishTime;
    
    return Math.max(totalTime, 1); // Tiempo mínimo de 1 hora
  };

  const price = calculatePrice();
  const time = calculateTime();

  useEffect(() => {
    onPriceUpdate(price, `${Math.ceil(time)}h`);
    onMaterialChange(selectedMaterial.name, selectedColor);
  }, [price, time, selectedMaterial.name, selectedColor, onPriceUpdate, onMaterialChange]);

  return (
    <div className="space-y-6">
      {/* Material Selection */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
          <Layers className="w-4 h-4 inline mr-2" />
          Material
        </label>
        <div className="grid grid-cols-2 gap-3">
          {materials.map((material) => (
            <button
              key={material.id}
              onClick={() => {
                setSelectedMaterial(material);
                setSelectedColor(material.colors[0]);
              }}
              className={`p-3 rounded-xl glass glass-hover text-left transition-all focus-ring ${
                selectedMaterial.id === material.id
                  ? 'bg-[var(--brand)] text-[var(--bg)]'
                  : ''
              }`}
            >
              <div className="font-medium">{material.name}</div>
              <div className="text-xs opacity-75 mt-1">{material.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
          <Palette className="w-4 h-4 inline mr-2" />
          Color
        </label>
        <div className="grid grid-cols-4 gap-2">
          {selectedMaterial.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-12 h-12 rounded-xl border-2 transition-all focus-ring ${
                selectedColor === color
                  ? 'border-[var(--brand)] scale-110'
                  : 'border-[var(--border)] hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
          <Package className="w-4 h-4 inline mr-2" />
          Cantidad
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-xl glass glass-hover flex items-center justify-center focus-ring"
          >
            -
          </button>
          <span className="text-2xl font-display font-bold min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-xl glass glass-hover flex items-center justify-center focus-ring"
          >
            +
          </button>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
            <Zap className="w-4 h-4 inline mr-2" />
            Relleno: {infill}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            value={infill}
            onChange={(e) => setInfill(Number(e.target.value))}
            className="w-full h-2 bg-[var(--surface)] rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
            <span>10% (Económico)</span>
            <span>100% (Sólido)</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
            Altura de capa: {layerHeight}mm
          </label>
          <select
            value={layerHeight}
            onChange={(e) => setLayerHeight(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
          >
            <option value={0.1}>0.1mm (Alta calidad)</option>
            <option value={0.2}>0.2mm (Estándar)</option>
            <option value={0.3}>0.3mm (Rápido)</option>
          </select>
        </div>
      </div>

      {/* Finish Options */}
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
          Acabado
        </label>
        <div className="space-y-2">
          {finishOptions.map((finish) => (
            <button
              key={finish.id}
              onClick={() => setSelectedFinish(finish)}
              className={`w-full p-3 rounded-xl glass glass-hover text-left transition-all focus-ring ${
                selectedFinish.id === finish.id
                  ? 'bg-[var(--brand)] text-[var(--bg)]'
                  : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{finish.name}</span>
                <span className="text-sm opacity-75">
                  +€{finish.price} (+{finish.time}h)
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="glass rounded-2xl p-6 border-t border-[var(--border)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-[var(--brand)]" />
            <span className="font-medium">Presupuesto</span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display font-bold gradient-text">
              €{price.toFixed(2)}
            </div>
            <div className="flex items-center space-x-1 text-sm text-[var(--text-secondary)]">
              <Clock className="w-4 h-4" />
              <span>{Math.ceil(time)} horas</span>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-[var(--text-tertiary)] space-y-1">
          <div>Volumen estimado: {volume.toFixed(1)}cm³</div>
          <div>Material: {selectedMaterial.name} ({selectedColor})</div>
          <div>Relleno: {infill}% • Capa: {layerHeight}mm</div>
          {selectedFinish.price > 0 && <div>Acabado: {selectedFinish.name}</div>}
        </div>
      </div>
    </div>
  );
}
