import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from 'angular-ui/app/components/avatar/avatar.component';

type Size = 'sm' | 'md' | 'lg';
type Variant =
  | 'primary' | 'primaryLight' | 'secondary'
  | 'accent' | 'accentSoft' | 'cherry'
  | 'success' | 'warning' | 'info' | 'error'
  | 'indigo' | 'indigoAlt' | 'neutralDark'
  | 'yellow' | 'cyan';

type MatrixArgs = {
  variants: Variant[];
  sizes: Size[];
};

const variantMatrix: Variant[] = [
  'primary','primaryLight','secondary',
  'accent','accentSoft','cherry',
  'success','warning','info','error',
  'indigo','indigoAlt','neutralDark','yellow','cyan'
];
const sizeMatrix: Size[] = ['lg','md','sm'];

const meta: Meta<AvatarComponent> = {
  title: 'Electrons/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  args: {
    name: 'Xavier Xu',
    size: 'md',
    variant: 'primary',
    status: 'none'
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm','md','lg'] },
    variant: {
      control: 'select',
      options: variantMatrix
    },
    status: { control: 'inline-radio', options: ['none','online','away','busy','offline'] },
    src: { control: 'text' },
    name: { control: 'text' }
  }
};
export default meta;

type AvatarStory = StoryObj<AvatarComponent>;

export const Playground: AvatarStory = {};

export const WithImageAndStatus: AvatarStory = {
  args: {
    name: 'Alicia Baker',
    src: 'https://i.pravatar.cc/300?img=8',
    size: 'lg',
    variant: 'indigo',
    status: 'online'
  }
};

export const Matrix: AvatarStory = {
  name: 'Matrix (variants × tailles)',
  args: {
    variants: variantMatrix,
    sizes: sizeMatrix
  } as Partial<AvatarComponent> & MatrixArgs,
  render: (args) => {
    const matrixArgs = args as AvatarComponent & MatrixArgs;
    const variants = matrixArgs.variants ?? variantMatrix;
    const sizes = matrixArgs.sizes ?? sizeMatrix;

    return {
      props: {
        ...args,
        variants,
        sizes
      },
      moduleMetadata: {
        imports: [AvatarComponent]
      },
      template: `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
          <ng-container *ngFor="let v of variants">
            <div style="display:grid;gap:16px;">
              <div *ngFor="let s of sizes" style="display:flex;align-items:center;gap:12px;">
                <qa-avatar [name]="'XX'" [variant]="v" [size]="s"></qa-avatar>
                <code style="font-size:12px">{{v}} · {{s}}</code>
              </div>
            </div>
          </ng-container>
        </div>
      `
    };
  }
};
