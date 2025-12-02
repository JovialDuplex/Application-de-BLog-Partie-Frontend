import {useState, useEffect, useRef} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import style from "./addArticle.module.css";
import style2 from "./showArticle.module.css";
import {useAuthContext} from "../../context/authContext";
import SearchBar from "../../components/searchBar/searchBar";
import HCard from "../../components/HCard/HCard";
import image from "../../assets/images/image18.png";
import UserBadge from "../../components/userBadge/userBadge";
import "./showarticle.css";


export const ArticlePage = ()=>{
    const [articles, setArticles] = useState([]);
    const getArticles = async ()=>{
        const response = await axios.get("http://localhost:3001/api/article/");
        console.log(await response.data);
        setArticles(await response.data.articles);
    };
    const navigate = useNavigate();
    const {token} = useAuthContext();

    const deleteArticle = async (article_id)=>{
        const response = await axios.delete("http://localhost:3001/api/article/delete/" + article_id, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const data = await response.data;
        if(data.status === "success") {
            navigate("/article");
            getArticles();
        }
    };

    useEffect(()=>{
        getArticles();
    }, []);

    return (
        <>
            <Link to={"/article/add-article"}> Add article </Link>

            {articles.length !== 0 ? (
                    <>
                        <ul>
                            { articles.map((article, index)=>(
                                <li key={index}>
                                    <div>
                                        <Link to={`/article/show/${article._id}`}> {article.article_title}</Link>
                                        <Button onClick={()=>deleteArticle(article._id)}> Delete Article </Button>
                                    </div><br/>
                                </li>
                            ))
                            }
                        </ul>
                        <Link to={"/article/update-article"}> update article </Link>
                    </>
                ) : (
                    <p> Aucun article a Afficher </p>
                )}

        </>
    )
};

export const ShowArticlePage = ()=>{
    const [article, setArticle] = useState({});
    const [articleList, setArticleList] = useState([]);

    const {articleId} = useParams();
    const getArticle = async ()=>{
        const response = await axios.get(`http://localhost:3001/api/article/show/${articleId}`);
        setArticle(await response.data.article);
    };
    const getArticleList = async()=>{
        const response = await axios.get("http://localhost:3001/api/article/");
        setArticleList(await response.data.articles);
    };

    const formatISODate = (isoDate)=>{
      const date = new Date(isoDate);
      return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
      });
    };

    useEffect(()=>{
        getArticle();
        getArticleList();

    }, [articleId]);

    const char = "bonjour".repeat(40);
    return (
      <div className={style2.mainContainer}>
        <section className={`${style2.section1} pe-3`}>
            <header>
                <img alt={" article image "} src={`http://localhost:3001${article.article_image}`} width={"100%"} height={"auto"}/>
                <div className={style2.articleInfo}>
                    <h2 className="text-capitalize fw-bold">{article.article_title}</h2>
                    <div><UserBadge user_name={article.article_author.user_name}/></div>
                    <h4> {formatISODate(article.article_dateCreation)}</h4>
                </div>
            </header>
            <main>
                {/*<p>*/}

                {/*    <strong>*/}
                {/*        <h3> <u> Description </u></h3> <br/>*/}
                {/*        {article.article_description}*/}

                {/*    </strong>*/}
                {/*</p>*/}

                {/*<p>*/}
                {/*    <h3><u>Bon a savoir </u></h3>*/}
                {/*    /!*{article.article_content}*!/*/}
                {/*    {char}*/}
                {/*</p>*/}
                {/*{char}*/}
            </main>
        </section>

        <section className={`${style2.section2} d-flex flex-column gap-3`}>
            <SearchBar />
            <ul className={`flex-grow-1 p-2 list-article ${style2.listArticle}`}>
                {
                    articleList.map((article, key)=>(
                       <li key={key}>
                        <HCard article_id={article._id} article_title={article.article_title} article_image={`http://localhost:3001${article.article_image}`} article_author={article.article_author.user_name} article_date_creation={formatISODate(article.article_dateCreation)} article_category={article.article_category.category_name}/>
                       </li>
                    ))
                }

            </ul>

        </section>
      </div>
  )
};

export const AddArticlePage = ()=>{
    const filePickerRef = useRef(null);
    const [formData, setFormData] = useState({
        article_title: "",
        article_description: "",
        article_content: "",
        article_image: null,
        article_category: "",
    });

    const [formDataError, setFormDataError] = useState({
        article_title: "",
        article_description: "",
        article_content: "",
        article_image: "",
        article_category: "",
    });

    const [categoryList, setCategoryList] = useState([]);

    const [image, setImage] = useState(null);

    const openFilePicker = ()=> filePickerRef.current.click();
    const selectFile = (event)=>{
        const file = event.target.files[0];
        if(file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setFormData({...formData, article_image: file});
        }
    };
    const removeImage = ()=> {
        setImage(null);
        setFormData({...formData, article_image: null});
    };
    const changeValue = (event)=>{
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const {token} = useAuthContext();
    const navigation = useNavigate();

    const sendFormData = async(myData)=>{
        console.log(token);
        const response = await axios.postForm("http://localhost:3001/api/article/add/", myData, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        const data = await response.data;
        if(data.status !== "success") {
            console.log(data.details);
        } else {
            console.log("article adding successfully");
            navigation("/article");
        }
    }

    const submitForm = async (event)=>{
        event.preventDefault();
        await sendFormData(formData);
    }

    const getCategoriesOfUserLoggedIn = async ()=>{
        const response = await axios.get("http://localhost:3001/api/category/", {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });

        console.log(await response.data);
        const data = await response.data;
        setCategoryList(data.categories);
    };
    useEffect(() => {
        getCategoriesOfUserLoggedIn();
    }, []);

    return (
      <div className={`h-100 w-100 d-flex align-items-center justify-content-center p-2`}>

          <form method={"post"} encType={"multipart/form-data"} onSubmit={submitForm} className={`${style.mainContainer} container`}>
              <span className={`fs-1 text-center fw-bold text-capitalize ${style.formTitle}`}> Ajouter des Articles </span>
              <div className={style.block1}>
                  <div className={`${style.inputField}`}>
                        {/*<label> Article Name </label>*/}
                        <input className={style.error} type={"text"} name={"article_title"} placeholder={"Article Name"} onChange={changeValue} value={formData.article_title}/>
                  </div>
                  <div className={style.inputField}>
                      {/*<label> Article Description </label>*/}
                      <textarea placeholder={" Article Description"} name={"article_description"} onChange={changeValue} value={formData.article_description}/>
                  </div>

                  <div className={style.inputField}>
                      {/*<label> Article Content </label>*/}
                      <textarea placeholder={"Article Content"} name={"article_content"} onChange={changeValue} value={formData.article_content}/>
                  </div>

                  <div className="bg-secondary p-2 rounded-2">
                      { categoryList.length !== 0 ? (
                          <>

                              <select className="form-select" name={"article_category"} value={formData.article_category} onChange={changeValue}>
                                  <option>Select One category</option>
                                  {
                                      categoryList.map((category, index)=>(
                                          <option key={index} value={category._id}>{category.category_name}</option>
                                      ))
                                  }
                              </select>
                              <Link className={"btn btn-primary"} to={"/dashboard"}> Add Other Categories </Link>
                          </>
                      ) : (
                          <div className="d-flex align-items-center justify-content-between">
                              <h6> You don't have a category </h6>
                              {/*<Button variant={"light"}> Manage My Categories </Button>*/}
                              <Link className="btn btn-light" to={"/dashboard"}> Manage My Categories </Link>
                          </div>
                      )}
                  </div>
              </div>
              <div className={style.block2}>
                  {
                      image !== null ? (
                      <>
                        <img src={image} alt={"article image"} />
                        <Button type={"button"} onClick={removeImage} style={{zIndex: 2, position:"absolute", top: 0, right:0, transform:"translate(-10px, 10px)", borderRadius: "50%"}} variant={"dark"}> <span className="fas fa-close"></span> </Button>
                      </>) : (
                          <>
                              <span className={`fas fa-image ${style.imageLogo}`} ></span>
                              <Button variant="dark" type={"button"} className="fw-bold" onClick={openFilePicker}> Select Image </Button>
                              <input type="file" accept="image/*" onChange={selectFile} ref={filePickerRef} style={{display: "none"}}/>
                          </>
                      )
                  }
              </div>

              <Button type="submit" variant={"warning"} className={style.submitButton}> Add Article</Button>
          </form>
      </div>
    )
};