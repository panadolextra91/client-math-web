export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-beige-50">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-light text-beige-900 tracking-tight">
            Math Learning Game
          </h1>
          <p className="text-lg text-beige-700 font-light">
            Practice math skills with fun challenges
          </p>
        </div>

        {/* Design System Preview */}
        <div className="bg-beige-100 rounded-lg p-8 space-y-6 border border-beige-200">
          <h2 className="text-2xl font-light text-beige-900">Design System</h2>
          
          {/* Color Palette */}
          <div className="space-y-4">
            <h3 className="text-lg text-beige-800 font-medium">Colors</h3>
            
            {/* Beige Palette */}
            <div>
              <p className="text-sm text-beige-700 mb-2">Beige Palette</p>
              <div className="flex gap-2">
                <div className="w-16 h-16 bg-beige-200 rounded border border-beige-300"></div>
                <div className="w-16 h-16 bg-beige-300 rounded border border-beige-400"></div>
                <div className="w-16 h-16 bg-beige-400 rounded border border-beige-500"></div>
                <div className="w-16 h-16 bg-beige-500 rounded border border-beige-600"></div>
              </div>
            </div>

            {/* Green Palette */}
            <div>
              <p className="text-sm text-beige-700 mb-2">Green Palette</p>
              <div className="flex gap-2">
                <div className="w-16 h-16 bg-green-200 rounded border border-green-300"></div>
                <div className="w-16 h-16 bg-green-300 rounded border border-green-400"></div>
                <div className="w-16 h-16 bg-green-500 rounded border border-green-600"></div>
                <div className="w-16 h-16 bg-green-600 rounded border border-green-700"></div>
              </div>
            </div>
          </div>

          {/* Button Examples */}
          <div className="space-y-4">
            <h3 className="text-lg text-beige-800 font-medium">Buttons</h3>
            <div className="flex gap-4 flex-wrap">
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                Primary
              </button>
              <button className="px-6 py-2 bg-beige-200 text-beige-900 rounded-lg hover:bg-beige-300 transition-colors font-medium">
                Secondary
              </button>
              <button className="px-6 py-2 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium">
                Outline
              </button>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h3 className="text-lg text-beige-800 font-medium">Typography</h3>
            <div className="space-y-2">
              <p className="text-3xl font-light text-beige-900">Light Heading</p>
              <p className="text-xl text-beige-800">Regular Text</p>
              <p className="text-base text-beige-700">Body Text</p>
              <p className="text-sm text-beige-600">Small Text</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="text-center">
          <p className="text-beige-600 text-sm">
            Phase 1 Complete • Ready for development
          </p>
        </div>
      </div>
    </main>
  );
}
