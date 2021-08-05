import styles from '../css/Icon.module.css';

export default function Icon({imageUrl,  username=""}){

    return(
        <div className={styles.content}>
            <div className={styles.icon}>
                {/* TODO: when the img cannot find, use the default image */}
                {/* <img className={styles.my_img} src={imageUrl} alt=""/> */}
                <img className={styles.my_img} src={imageUrl} alt="" onError={(e)=>{e.target.onerror = null; e.target.src="/images/default.png"}}/>
            </div>
            <span className={styles.text}>
                {username}
            </span>
        </div>
    );
}