import { useState, useEffect } from 'react';
import { 
  Activity, 
  Cloud, 
  Palette, 
  Download, 
  Github, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Menu,
  ChevronRight,
  ShieldCheck,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectState, LogEntry } from './types';

const INITIAL_STATE: ProjectState = {
  version: "4.0",
  buildId: "ARCHIVIST_BUILD_2024",
  stats: {
    readiness: 100,
    filesIntegrated: 47,
    githubStatus: 'CONNECTED',
    lastSync: "2024-03-25 21:26",
    repository: "mana-archive/core-v4",
    branch: "main"
  },
  logs: [
    { id: "001", code: "TYPOGRAPHY_ENGINE", category: "System", message: "Noto Serif JP Loaded via Global CDN", status: "STABLE" },
    { id: "002", code: "COLOR_PALETTE", category: "UI", message: "Primary Navy #1A1A2E / Surface #FDF9F4", status: "STABLE" },
    { id: "003", code: "CONSTRAINT_LOGIC", category: "Layout", message: "Strict 0px Border Radius Constraint Applied", status: "STABLE" },
    { id: "004", code: "GITHUB_SYNC", category: "VCS", message: "Remote repository mana-archive/core-v4 synchronized", status: "SYNCED" }
  ]
};

export default function App() {
  const [state, setState] = useState<ProjectState>(INITIAL_STATE);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    // Simulate GitHub Push
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newLog: LogEntry = {
      id: (state.logs.length + 1).toString().padStart(3, '0'),
      code: "GITHUB_PUSH",
      category: "VCS",
      message: `Build ${state.buildId} pushed to GitHub`,
      status: "SYNCED"
    };

    setState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        lastSync: new Date().toISOString().replace('T', ' ').substring(0, 16)
      },
      logs: [newLog, ...prev.logs]
    }));
    
    setIsSyncing(false);
    setShowSyncModal(false);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-secondary selection:text-white">
      {/* TopAppBar */}
      <nav className="fixed top-0 z-50 w-full bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-12">
            <span className="text-xl font-serif font-black tracking-tighter text-primary">PROJECT MANA</span>
            <div className="hidden md:flex gap-8 items-center">
              {['Theory', 'Archive', 'Terminal', 'Impact'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className={`font-sans text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 hover:text-secondary ${
                    item === 'Terminal' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-surface/60'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <button className="bg-primary-container text-white px-6 py-2 font-sans text-xs uppercase tracking-[0.15em] font-bold hover:bg-primary transition-all duration-300">
            Reporting Terminal
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto">
        {/* Hero Header */}
        <header className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-secondary mb-4 flex items-center gap-2"
            >
              <ShieldCheck size={14} />
              Deployment Manifest
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-black tracking-tight leading-tight text-primary"
            >
              PROJECT MANA <span className="italic font-light">v{state.version}</span>
            </motion.h1>
          </div>
          <div className="md:col-span-4 text-left md:text-right">
            <div className="inline-block bg-surface-container-low px-6 py-3 border-l-4 border-primary">
              <p className="font-sans text-[10px] uppercase tracking-widest font-bold opacity-60">System Version</p>
              <p className="font-serif font-black text-xl tracking-tight">{state.buildId}</p>
            </div>
          </div>
        </header>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-outline-variant/30">
          {/* Readiness Card */}
          <div className="bg-surface-container-low p-10 flex flex-col justify-between group hover:bg-surface-container transition-colors duration-500 border-r border-outline-variant/30">
            <div className="flex justify-between items-start mb-16">
              <Activity className="text-primary" size={32} />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">Operational</span>
            </div>
            <div>
              <h2 className="font-serif text-4xl font-black mb-2 leading-none">Status: Operational Readiness {state.stats.readiness}%</h2>
              <p className="font-sans text-sm opacity-60 max-w-[250px]">All core nodes are synchronized with the central repository.</p>
            </div>
          </div>

          {/* GitHub Integration Card */}
          <div className="bg-primary-container p-10 flex flex-col justify-between text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
              <Github size={120} />
            </div>
            <div className="flex justify-between items-start mb-16 z-10">
              <Github className="text-on-primary-container" size={32} />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-surface-variant">GitHub Synchronization</span>
            </div>
            <div className="z-10">
              <h2 className="font-serif text-4xl font-black mb-2 leading-none">
                {state.stats.githubStatus === 'CONNECTED' ? 'Integrated with GitHub' : 'Syncing Repository'}
              </h2>
              <div className="flex items-center gap-2 font-sans text-sm opacity-70 mb-4">
                <code className="bg-white/10 px-2 py-0.5">{state.stats.repository}</code>
                <ChevronRight size={12} />
                <span>{state.stats.branch}</span>
              </div>
              <button 
                onClick={() => setShowSyncModal(true)}
                className="flex items-center gap-2 bg-secondary text-white px-4 py-2 font-sans text-[10px] uppercase tracking-widest font-bold hover:bg-secondary/80 transition-all"
              >
                <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
                Push Update
              </button>
            </div>
          </div>

          {/* Verification Card */}
          <div className="bg-surface-container-high p-10 flex flex-col justify-between border-l border-outline-variant/30">
            <div className="flex justify-between items-start mb-16">
              <Cloud className="text-primary" size={32} />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase">Verified Integrity</span>
            </div>
            <div>
              <h2 className="font-serif text-4xl font-black mb-2 leading-none">{state.stats.filesIntegrated} Files Verified</h2>
              <p className="font-sans text-sm opacity-60">Checksum validation complete. Last sync: {state.stats.lastSync || 'Never'}</p>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <section className="mt-20 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 w-full relative">
            <div className="aspect-[16/7] bg-surface-container-low overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Architectural abstraction" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000 cursor-crosshair"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-white p-6 md:w-1/2 shadow-2xl">
              <p className="font-sans text-[10px] uppercase tracking-widest font-bold mb-2">Restricted Access</p>
              <p className="font-serif text-lg leading-tight">Unauthorized duplication is strictly prohibited by the Archive Ethics Committee.</p>
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col items-start gap-8 px-4">
            <p className="font-sans text-sm leading-relaxed text-on-surface/80">
              The MANA v4.0 distribution includes the full design token library, editorial templates, and the "Modern Archivist" behavioral logic. Deployment package is encrypted and signed with primary-container authentication.
            </p>
            <button className="group relative w-full bg-primary hover:bg-primary-container transition-all duration-500 p-8 flex justify-between items-center overflow-hidden">
              <div className="z-10 text-left">
                <span className="block font-sans text-[10px] text-surface-variant uppercase tracking-[0.3em] font-bold mb-1">Final Authorization Required</span>
                <span className="block font-serif text-xl md:text-2xl text-white font-black">DOWNLOAD INTEGRATED PACKAGE (v{state.version})</span>
              </div>
              <Download className="text-white group-hover:translate-x-2 transition-transform duration-500 z-10" size={32} />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="border-t border-outline-variant/30 pt-4">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest block mb-1">Payload</span>
                <span className="font-serif font-bold">142.8 MB</span>
              </div>
              <div className="border-t border-outline-variant/30 pt-4">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest block mb-1">Format</span>
                <span className="font-serif font-bold">ARC.CRYPT</span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Manifest */}
        <section className="mt-32">
          <div className="flex items-center justify-between mb-8 border-b-2 border-primary pb-2">
            <h3 className="font-serif text-2xl font-black">Technical Logs</h3>
            <History size={20} className="opacity-40" />
          </div>
          <div className="space-y-1">
            {state.logs.map((log) => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={log.id} 
                className="flex flex-col md:flex-row justify-between py-6 group hover:bg-surface-container-low px-4 transition-colors border-b border-outline-variant/10"
              >
                <div className="flex gap-8 items-center">
                  <span className="font-sans text-xs font-bold opacity-40">{log.id}</span>
                  <span className="font-sans text-xs uppercase tracking-widest font-bold w-32">{log.code}</span>
                  <span className="font-serif text-sm italic text-on-surface/80">{log.message}</span>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <span className="font-sans text-[10px] font-bold opacity-40 uppercase tracking-widest">{log.category}</span>
                  <span className={`font-sans text-[10px] font-bold px-2 py-0.5 ${
                    log.status === 'SYNCED' ? 'bg-on-tertiary-container text-white' : 'text-tertiary-container'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low py-20 px-12 mt-24">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.15em] font-bold text-on-surface/60">
              © 2024 PROJECT MANA ARCHIVE. RESTRICTED DISTRIBUTION.
            </p>
          </div>
          <div className="flex flex-wrap gap-8">
            {['Privacy', 'Terms', 'Economic Ethics', 'Contact'].map((link) => (
              <a 
                key={link}
                href="#" 
                className="font-sans text-xs uppercase tracking-[0.15em] font-bold text-on-surface/60 hover:text-secondary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Sync Modal */}
      <AnimatePresence>
        {showSyncModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSyncing && setShowSyncModal(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-surface p-12 max-w-lg w-full shadow-2xl border-t-8 border-secondary"
            >
              <h3 className="font-serif text-3xl font-black mb-4">Push to GitHub</h3>
              <p className="font-sans text-sm text-on-surface/70 mb-8 leading-relaxed">
                You are about to synchronize the current deployment manifest with the remote repository. This action will create a new commit on the <code className="bg-surface-container px-1">{state.stats.branch}</code> branch.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                  <span>Repository</span>
                  <span>{state.stats.repository}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                  <span>Build ID</span>
                  <span>{state.buildId}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  disabled={isSyncing}
                  onClick={handleSync}
                  className="flex-1 bg-primary text-white py-4 font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      Synchronizing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={14} />
                      Confirm Push
                    </>
                  )}
                </button>
                {!isSyncing && (
                  <button 
                    onClick={() => setShowSyncModal(false)}
                    className="px-8 border border-outline font-sans text-xs uppercase tracking-widest font-bold hover:bg-surface-container transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
