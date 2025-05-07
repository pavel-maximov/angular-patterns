import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-component',
  template: `
    <!-- Component Template Structure -->
    <div class="component-demo">
      <h2>Angular Component Fundamentals</h2>

      <!-- Data Binding Examples -->
      <section>
        <h3>Data Binding</h3>

        <!-- Interpolation -->
        <div class="binding-example">
          <h4>Interpolation:</h4>
          <p>{{ title }}</p>
          <p>Count: {{ count }}</p>
        </div>

        <!-- Property Binding -->
        <div class="binding-example">
          <h4>Property Binding:</h4>
          <button [disabled]="isDisabled">Property Bound Button</button>
        </div>

        <!-- Event Binding -->
        <div class="binding-example">
          <h4>Event Binding:</h4>
          <button (click)="incrementCount()">Increment Count</button>
          <button (click)="resetCount()">Reset Count</button>
        </div>

        <!-- Two-way Binding -->
        <div class="binding-example">
          <h4>Two-way Binding:</h4>
          <input [(ngModel)]="name" placeholder="Enter name" />
          <p>Hello, {{ name || 'Guest' }}!</p>
        </div>
      </section>

      <!-- Input/Output Properties -->
      <section>
        <h3>Input/Output Properties</h3>
        <p>This component accepts an Input () configuration and emits Output () events</p>
        <button (click)="emitCustomEvent()">Emit Custom Event</button>
      </section>

      <!-- Content Projection -->
      <section>
        <h3>Content Projection</h3>
        <div class="content-slot">
          <p>Default content (if no ng-content is projected)</p>
          <ng-content></ng-content>
        </div>

        <!-- Named Content Projection -->
        <div class="header-slot">
          <ng-content select="[header]"></ng-content>
        </div>
        <div class="footer-slot">
          <ng-content select="[footer]"></ng-content>
        </div>
      </section>

      <!-- ViewChild Example -->
      <section>
        <h3>ViewChild Example</h3>
        <div #viewChildElement>This element is accessed via ViewChild</div>
        <button (click)="logViewChild()">Log ViewChild Info</button>
      </section>

      <!-- Lifecycle Status -->
      <section>
        <h3>Component Lifecycle</h3>
        <ul>
          <li *ngFor="let message of lifecycleMessages">{{ message }}</li>
        </ul>
      </section>
    </div>
  `,
  styleUrl: './component.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.Emulated, // Default: style encapsulation
})
export class ComponentComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  // Basic Properties
  title = 'Component Demo';
  count = 0;
  isDisabled = false;
  name = '';
  lifecycleMessages: string[] = [];

  // Input/Output properties
  @Input() config: { theme: string; showHeader: boolean } = {
    theme: 'default',
    showHeader: true,
  };
  @Output() customEvent = new EventEmitter<{ type: string; value: number }>();

  // ViewChild and ContentChild examples
  @ViewChild('viewChildElement') viewChildElement!: ElementRef;
  @ContentChild(TemplateRef) contentTemplate!: TemplateRef<any>;

  constructor() {
    this.addLifecycleMessage('Constructor called');
  }

  // Lifecycle Hooks
  ngOnChanges(changes: SimpleChanges): void {
    this.addLifecycleMessage('ngOnChanges called');
    if (changes['config']) {
      this.addLifecycleMessage(`Config changed: ${JSON.stringify(changes['config'].currentValue)}`);
    }
  }

  ngOnInit(): void {
    this.addLifecycleMessage('ngOnInit called');
    // Initialization logic would go here
  }

  ngAfterViewInit(): void {
    this.addLifecycleMessage('ngAfterViewInit called');
    // View is ready to be manipulated
  }

  ngOnDestroy(): void {
    this.addLifecycleMessage('ngOnDestroy called');
    // Cleanup logic would go here
  }

  // Event handlers
  incrementCount(): void {
    this.count++;
  }

  resetCount(): void {
    this.count = 0;
  }

  emitCustomEvent(): void {
    this.customEvent.emit({ type: 'increment', value: this.count });
    this.addLifecycleMessage(`Event emitted with count: ${this.count}`);
  }

  // ViewChild example
  logViewChild(): void {
    if (this.viewChildElement) {
      const element = this.viewChildElement.nativeElement;
      this.addLifecycleMessage(`ViewChild text content: ${element.textContent}`);

      // Change appearance to demonstrate DOM manipulation
      element.style.backgroundColor = '#e3f2fd';
      element.style.padding = '8px';
      element.style.borderRadius = '4px';
    }
  }

  // Helper methods
  private addLifecycleMessage(message: string): void {
    this.lifecycleMessages.push(`${new Date().toLocaleTimeString()}: ${message}`);
    // Keep only the latest 5 messages
    if (this.lifecycleMessages.length > 5) {
      this.lifecycleMessages.shift();
    }
  }
}
