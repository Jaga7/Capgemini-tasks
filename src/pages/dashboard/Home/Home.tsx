import styles from "./Home.module.css";
const Home = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles["home-header"]}>Homepage</h2>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium
        quod a consequatur quasi alias delectus doloremque illum maxime
        reprehenderit, quis, eaque impedit deleniti molestias rerum error hic
        similique consectetur culpa?
      </p>
    </div>
  );
};
export default Home;
