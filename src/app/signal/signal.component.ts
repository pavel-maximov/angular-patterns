import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  Signal,
  signal,
  untracked,
  WritableSignal,
} from '@angular/core';
import _ from 'lodash';
import { count } from 'rxjs';

@Component({
  selector: 'app-signal',
  template: `
    <!-- reading in template -->
    <h2>Current Count: {{ count() }}</h2>

    <div class="signal-demo">
      <div class="actions">
        <h3>Signal / Effects Operations:</h3>
        <!-- directly sets the signal value using .set() -->
        <button (click)="setToTen()">Set to 10</button>
        <!-- updates signal based on previous value using .update() -->
        <button (click)="increment()">Increment (+1)</button>
        <!-- resets signal to initial value and logs it -->
        <button (click)="createEffect()">Create Effect</button>
        <!-- resets signal to initial value and logs it -->
        <button (click)="reset()">Reset</button>
      </div>
    </div>
  `,
  styleUrl: './signal.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class SignalComponent {
  showCount: WritableSignal<boolean> = signal(true);
  count: WritableSignal<number> = signal(0);
  private injector = inject(Injector);

  // -- Custom equality for signal --------------------------------------
  // use _.isEqual as alternative to the default Object.is()
  data = signal(['test'], { equal: _.isEqual });

  // -- Effects creation scenarios  --------------------------------------
  // creating effect outside the injection context
  // like in a class method
  createEffect(): void {
    effect(
      () => {
        console.log(`Effect 2 count: ${this.count()}`);
      },
      // passing the injector to effect
      // to allow its creation outside the injection context
      { injector: this.injector }
    );
  }

  // inside initializer for fields of
  // @Component / @Injectable / @Directive classes
  // in this case it needs a filed name
  countEffect = effect(() => console.log(`Effect 1 count: ${this.count()}`));

  // in @Component / @Injectable / @Directive constructor
  constructor() {
    // effect cleanup for async operations started in effect
    effect(onCleanup => {
      const timer = setTimeout(() => {
        console.log(`Some async operation`);
      }, 1000);

      onCleanup(() => {
        clearTimeout(timer);
      });
    });

    // untracked dependency in effect
    // changes to it will not trigger the effect
    effect(() => {
      // signal passed to untracked is without ()!
      console.log(`Effect 4 showCount: ${untracked(this.showCount)}`);
      console.log(`Effect 4 count: ${this.count()}`);
    });

    effect(() => {
      // dynamic dependency guarded by showCount
      if (this.showCount()) {
        // is showCount is true count starts to be tracked
        console.log(`Effect 3 count: ${this.count()}`);
      }
    });
  }

  // destroying effects
  destroyEffect(): void {
    this.countEffect.destroy();
  }

  // -- Computed signals  --------------------------------------
  // creating a computed signal which
  // is tracking count only when showCount becomes true
  conditionalCount: Signal<string> = computed(() => {
    // when you read conditionalCount
    if (this.showCount()) {
      // count starts to be tracked
      return `The count is ${count()}.`;
    } else {
      // count is NOT tracked (saving resources)
      return 'Nothing to see here!';
    }
  });

  // computed signal depending on count
  doubleCount: Signal<number> = computed(() => this.count() * 2);

  // -- Changing Signal values  --------------------------------------
  // set new value (without accessing the previous value)
  setToTen(): void {
    this.count.set(10);
  }

  // set new value based on the previous value
  increment(): void {
    this.count.update(value => value + 1);
  }

  // resets the signal to its initial value and logs the new value
  reset(): void {
    this.count.set(0);
    this.destroyEffect();
  }

  // this to avoid unused variables
  logCount(): void {
    console.log(this.count());
    console.log(this.countEffect);
    console.log(this.doubleCount());
    console.log(this.conditionalCount());
  }
}
