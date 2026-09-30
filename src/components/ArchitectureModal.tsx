import React, { useState } from 'react';
import { X, Code2, Server, Database, Layers, CheckCircle2, Copy, Check } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'springboot' | 'angular' | 'database'>('springboot');

  if (!isOpen) return null;

  const springBootCode = `// Spring Boot 3 - Controller Rest & Service (Java 21 / Spring Boot 3.3)
@RestController
@RequestMapping("/api/v1/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<Page<ProjectResponseDTO>> listProjects(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            Pageable pageable) {
        return ResponseEntity.ok(projectService.findAll(category, search, pageable));
    }

    @PostMapping("/{id}/increment-views")
    public ResponseEntity<Void> incrementViews(@PathVariable String id) {
        projectService.incrementViewCount(id);
        return ResponseEntity.noContent().build();
    }
}`;

  const angularCode = `// Angular 18 - Component & Service (Standalone Components & Signals)
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.realpremise.com/api/v1/projects';

  public projects = signal<Project[]>([]);
  public loading = signal<boolean>(false);

  loadProjects(category?: string, query?: string): Observable<Project[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (query) params = params.set('search', query);

    return this.http.get<Project[]>(this.apiUrl, { params }).pipe(
      tap((data) => this.projects.set(data))
    );
  }
}`;

  const dbSchemaCode = `-- PostgreSQL Database Schema (PostgreSQL 16)
CREATE TABLE projects (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    screenshot_url VARCHAR(500),
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    completed_date VARCHAR(50),
    client_name VARCHAR(100),
    featured BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Arquitetura do Sistema: Spring Boot 3 + Angular 18
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Padrão de engenharia full-stack corporativa projetado para alta performance e segurança.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Tabs */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Tech Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-semibold">
              <Code2 className="w-4 h-4" />
              <span>Angular 18 (Signals & Standalone)</span>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <Server className="w-4 h-4" />
              <span>Spring Boot 3 + Java 21 REST API</span>
            </div>
            <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-semibold">
              <Database className="w-4 h-4" />
              <span>PostgreSQL 16 & Flyway Migration</span>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('springboot')}
              className={`pb-2 transition-colors border-b-2 ${
                activeTab === 'springboot'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Spring Boot Controller (Java)
            </button>
            <button
              onClick={() => setActiveTab('angular')}
              className={`pb-2 transition-colors border-b-2 ${
                activeTab === 'angular'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Angular 18 Service (TypeScript)
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`pb-2 transition-colors border-b-2 ${
                activeTab === 'database'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              PostgreSQL Schema (SQL)
            </button>
          </div>

          {/* Code Viewer Box */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 text-slate-200 p-4 font-mono text-xs leading-relaxed">
            <button
              onClick={() =>
                copyCode(
                  activeTab === 'springboot'
                    ? springBootCode
                    : activeTab === 'angular'
                    ? angularCode
                    : dbSchemaCode
                )
              }
              className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-sans font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>

            <pre className="overflow-x-auto p-1">
              <code>
                {activeTab === 'springboot' && springBootCode}
                {activeTab === 'angular' && angularCode}
                {activeTab === 'database' && dbSchemaCode}
              </code>
            </pre>
          </div>

          {/* Architecture Benefits */}
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <h3 className="font-bold font-display text-slate-900 dark:text-white">
              Recursos de Destaque no Backend Spring Boot + Frontend Angular:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Autenticação JWT Stateless com Spring Security 6</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Angular 18 Standalone Components & Signals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>ORM Spring Data JPA + Mapeamento PostgreSQL</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Tratamento global de exceções via @ControllerAdvice</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-950/50">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-sm"
          >
            Fechar Visualizador
          </button>
        </div>

      </div>
    </div>
  );
};
