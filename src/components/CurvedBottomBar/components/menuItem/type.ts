
interface Props {
    name: string;
    position: 'left' | 'right';
    component: () => JSX.Element;
}

export type ScreenBottomBar = React.FC<Props>