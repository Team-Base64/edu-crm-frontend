import styles from './App.module.scss';
import Button from './components/ui-kit/Button/Button.tsx';
function App() {
    return (
        <>
            <Button mode={'primary'} onClick={()=> alert('lol')} classes={styles.try}>
                <p>
                    adasdaasdasd
                </p>
            </Button>
        </>
    );
}

export default App;
