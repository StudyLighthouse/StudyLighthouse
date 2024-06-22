import React,{useState} from "react";
import "../styles/lander.css"
import Signup from "../components/signup.jsx"
import Login from "../components/login.jsx"
import axios from "axios";

// Introduction - First
const Introduction = function (){
  const [showSignup,setShowSignup] = useState(false)
  const [showLogin,setShowLogin] = useState(false)
    return (
        <div className="text-white">
            <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src="https://firebasestorage.googleapis.com/v0/b/study-lighthouse.appspot.com/o/project%20photoes%2Flogo.png?alt=media&token=d06cc264-0026-4d1a-bfaa-3f3587f7f561" alt="Logo" className="lg:w-24 lg:h-20 md:w-20 md:h-16 sm:w-16 sm:h-12 mr-10 rounded-full"/>
                    {/* <span className="text-lg font-bold">STUDY PARTNER</span> */}
                    <div className="hidden space-x-8 md:flex">
                        <a href="#About" className="hover:text-zinc-300">About Us</a>
                        <a href="#Features" className="hover:text-zinc-300">Features</a>
                        <a href="#Contact" className="hover:text-zinc-300">Contact Us</a>
                    </div>
                </div>
                <div className="flex gap-5">
                    <button onClick={() => setShowSignup(true)} className="px-3 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">Signup</button>
                    <button onClick={() => setShowLogin(true)} className="border border-#c48d00 hover:bg-zinc-700 text-#c48d00 font-bold py-2 px-4 rounded login">Login</button>
                    {showSignup && <Signup onClose={()=> {setShowSignup(false)}}/>}
                    {showLogin && <Login onClose = {() => {setShowLogin(false)}}/>}

                </div>
            </nav>
            <div className="flex justify-between min-h-screen pl-6 md:flex-col lg:flex-row md:items-center md:pt-40 sm:flex-col sm:pt-36">
                <div className="space-y-4 md:text-left md:w-full lg:w-1/2 intro-text">
                    <h1 className="ml-4 text-5xl font-bold md:text-7xl shine">Adaptive Learning Companion</h1><br></br>
                    <p className="ml-4 text-lg md:text-2xl">Study Partner offers AI help, voice assistance, and community Q&A for personalized, hands-free learning and collaboration.</p>
                </div>
                <div className="intro-circle1"></div>
                <div className="flex justify-center lg:-mt-48">
                    <img src="https://i.ibb.co/2k3zhfc/chatbot-voice-controlled-virtual-assistant-abstract-concept-vector-illustration-107173-25716-removeb.png" alt="Illustration" className="sm:h-4/6 sm:w-4/6 lg:h-full lg:w-full"/>
                </div>
            </div>
            <div className="intro-circle2"></div>
        </div>
    )
};


// About-Second
const About = ()=>{
    return (
        <div id="About">
        <div className="flex flex-col items-center justify-center text-white rounded-lg md:flex-row about">
          <div className="p-4 md:w-1/2">
            <img
              src="https://i.ibb.co/G9QxDBq/removal-ai-b847daa3-a976-4928-9a42-06f416598696-chatbot-development-with-deep-nlp.png"
              alt="Robot and Chat App"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="p-4 md:w-1/2">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to explore the world of knowledge?
            </h2><br></br>
            <p className="text-lg md:text-xl">
              Easily clarify your doubts and broaden your knowledge with our Study Partner website,
              designed to connect you with expert assistance and a wealth of learning resources.
            </p>
          </div>
        </div>
        <div className="about-circle1"></div>
        </div>
      )
};


// Features-Third
const Features =  function () {
  const [query,setQuery]=useState("");
  const postQuery=async (e)=>{
    e.preventDefault();
    if(query===""){
      alert("please Provide context of ytour query");
    }else{
      try {
         const response=await axios.post('https://studylighthouse.onrender.com/postQuery', { query });
         alert(response.data.message);
         setQuery("");
      } catch (error) {
        alert(error)
      }
    }
  }
    return (
      <div className="p-8 text-center text-white" id="Features">
        <div className="flex flex-wrap gap-8 mb-8 justify-evenly -z-10 relative">
          <div className="relative w-64 p-6 feature-cards">
            <div className="absolute top-0 p-2 transform -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 feature-circle1"> 
            </div>
            <img className="absolute top-0 p-2 transform -translate-x-1/2 -translate-y-1/2 left-1/2" width="45" height="32" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 20 20'%3E%3Cg fill='white'%3E%3Cpath d='M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0z'/%3E%3Cpath d='M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6 6 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0z'/%3E%3C/g%3E%3C/svg%3E" alt="Voice Assistant" />
            <h3 className="mt-8 text-xl font-bold">Voice Assistant</h3>
            <p className="mt-2 text-zinc-400">
            It allows hands-free interaction for asking questions and requesting explanations.
            </p>
          </div>
          <div className="relative w-64 p-6 rounded-lg shadow-lg bg-zinc-800 feature-cards">
            <div className="absolute top-0 p-2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full left-1/2 feature-circle1">
            </div>
            <img className="absolute top-0 p-2 transform -translate-x-1/2 -translate-y-1/2 left-1/2" width="50" height="50" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='white' fill-rule='evenodd' d='M8.002 4.553a50.577 50.577 0 0 1 8.099.04l1.624.138a2.666 2.666 0 0 1 2.408 2.252l.102.669a20.665 20.665 0 0 1-.096 6.835a2.343 2.343 0 0 1-2.305 1.923H8.858c-.207 0-.41.051-.592.149l-3.911 2.102A.75.75 0 0 1 3.25 18V9.483a4.93 4.93 0 0 1 4.559-4.915zM8 9.5A1.25 1.25 0 1 0 8 12a1.25 1.25 0 0 0 0-2.5m4 0a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m2.75 1.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0' clip-rule='evenodd'/%3E%3C/svg%3E" alt="Voice Assistant" />
            <h3 className="mt-8 text-xl font-bold">TextGPT</h3>
            <p className="mt-2 text-zinc-400">
              It provides quick AI assistance, answering questions and explaining to improve your
              learning.
            </p>
          </div>
          <div className="relative w-64 p-6 rounded-lg shadow-lg bg-zinc-800 feature-cards">
            <div className="absolute top-0 p-2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full left-1/2 feature-circle1">
            </div>
            <img className="absolute top-0 p-2 transform -translate-x-1/2 -translate-y-1/2 left-1/2" width="50" height="50" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 64 64'%3E%3Cpath fill='white' d='M2 56h60l-4.979-39.857c-.037-3.346.048-5.199.048-5.199c-.776.239-1.931.331-3.314.331c-.234 0-.479-.004-.728-.009c-.005-2.089.039-3.266.039-3.266c-1.201 1.58-3.765 1.982-6.688 1.982c-3.035 0-6.456-.433-9.144-.433c-4.147 0-5.033 2.775-5.225 3.968c-.192-1.198-1.082-3.961-5.22-3.961c-2.688 0-6.107.433-9.141.433c-2.926 0-5.49-.402-6.691-1.984c0 0 .044 1.176.038 3.26c-.247.004-.493.009-.728.009c-1.385 0-2.537-.092-3.313-.331c0 0 .081 1.771.05 4.986zm51.755-42.863c.505 0 .968-.012 1.393-.035c-.052 5.433.179 20.275 3.489 39.48a45.058 45.058 0 0 1-1.833-.333c.392-.163.703-.385.913-.684c-3.794-16.071-4.557-30.928-4.671-38.438c.24.005.479.01.709.01m-16.131-1.026c2.031 0 4.749.239 7.624.492c2.008.177 4.059.355 5.93.455c.115 7.395.846 21.905 4.407 37.608c-.269.045-.642.08-1.156.08c-1.9 0-4.622-.483-7.254-.951c-2.964-.526-6.028-1.071-8.528-1.071c-1.938 0-3.464.364-4.667.921c-.046.019-.099.033-.142.053l-.007-35.011c.035-.494.383-2.576 3.793-2.576m-24.776.947c1.871-.1 3.92-.278 5.927-.455c2.876-.252 5.594-.492 7.627-.492c3.299 0 3.74 1.928 3.791 2.617l-.009 34.969c-.079-.035-.173-.063-.256-.096c-1.188-.529-2.674-.875-4.555-.875c-2.5 0-5.564.546-8.527 1.072c-2.634.469-5.355.952-7.255.952c-.514 0-.888-.035-1.153-.079c3.562-15.705 4.293-30.22 4.41-37.613m-3.971.044c.426.023.888.035 1.393.035c.23 0 .47-.005.71-.009c-.115 7.508-.879 22.369-4.675 38.443c.209.297.517.519.904.681c-.621.124-1.232.237-1.826.331c3.313-19.206 3.545-34.048 3.494-39.481'/%3E%3Cpath fill='white' d='M25.197 13.916c2.566 0 3.412.582 3.421.588l.238-.312l.243-.305c-.099-.074-1.049-.736-3.875-.736c-2.127 0-4.753.539-7.083 1.013c-1.698.348-3.169.649-4.011.649l-.069.778c.927 0 2.441-.311 4.19-.671c2.3-.471 4.894-1.004 6.946-1.004m-.134 3.92c2.616 0 3.481.605 3.489.611l.242-.322l.248-.318c-.101-.081-1.069-.768-3.951-.768c-2.169 0-4.847.558-7.223 1.055c-1.733.359-3.233.673-4.091.673l-.073.811c.946 0 2.489-.324 4.274-.696c2.344-.491 4.993-1.046 7.085-1.046m-.139 4.08c2.669 0 3.549.627 3.559.635l.247-.336l.254-.329c-.104-.084-1.093-.799-4.032-.799c-2.212 0-4.944.581-7.369 1.097c-1.769.375-3.301.702-4.175.702l-.077.842c.966 0 2.542-.336 4.362-.724c2.393-.513 5.095-1.088 7.231-1.088m-.147 4.246c2.723 0 3.622.656 3.633.662l.252-.349l.258-.346c-.105-.085-1.114-.831-4.112-.831c-2.258 0-5.048.605-7.523 1.144c-1.806.391-3.368.729-4.263.729l-.078.88c.984 0 2.596-.351 4.454-.756c2.444-.533 5.2-1.133 7.379-1.133m-.151 4.425c2.78 0 3.699.684 3.707.691l.26-.365l.264-.36c-.109-.089-1.138-.865-4.2-.865c-2.304 0-5.153.63-7.681 1.19c-1.846.407-3.441.762-4.355.762l-.081.917c1.005 0 2.649-.366 4.549-.79c2.495-.555 5.309-1.18 7.537-1.18m-.159 4.615c2.84 0 3.778.712 3.787.72l.264-.38l.271-.375c-.11-.093-1.161-.903-4.288-.903c-2.354 0-5.266.658-7.848 1.242c-1.887.426-3.518.795-4.451.795l-.085.955c1.028 0 2.71-.381 4.65-.821c2.55-.581 5.427-1.233 7.7-1.233m-.164 4.818c2.902 0 3.859.746 3.869.754l.27-.398l.275-.392c-.112-.098-1.186-.943-4.382-.943c-2.405 0-5.38.688-8.021 1.296c-1.927.445-3.596.832-4.548.832l-.09 1c1.051 0 2.77-.4 4.754-.861c2.608-.606 5.549-1.288 7.873-1.288m-.175 5.035c2.97 0 3.947.777 3.957.785l.276-.416l.283-.408c-.116-.102-1.212-.986-4.479-.986c-2.46 0-5.503.718-8.204 1.356c-1.971.466-3.678.866-4.652.866l-.093 1.046c1.073 0 2.831-.416 4.861-.897c2.669-.633 5.677-1.346 8.051-1.346m11.278-30.551c.008-.006.854-.588 3.42-.588c2.054 0 4.647.533 6.946 1.004c1.749.36 3.263.671 4.189.671l-.069-.778c-.842 0-2.313-.301-4.011-.649c-2.328-.474-4.955-1.013-7.082-1.013c-2.824 0-3.776.662-3.876.736l.244.305zm3.528 2.536c-2.883 0-3.852.687-3.951.768l.248.318l.241.322c.009-.005.873-.611 3.49-.611c2.092 0 4.739.554 7.083 1.045c1.784.373 3.328.696 4.274.696l-.073-.811c-.856 0-2.357-.313-4.09-.673c-2.375-.496-5.053-1.054-7.222-1.054m.138 4.047c-2.939 0-3.928.715-4.031.799l.253.329l.247.336c.009-.007.891-.635 3.559-.635c2.137 0 4.836.575 7.23 1.087c1.82.388 3.397.724 4.361.724l-.075-.842c-.875 0-2.406-.327-4.176-.702c-2.422-.516-5.156-1.096-7.368-1.096m.144 4.211c-3 0-4.009.745-4.112.831l.257.346l.253.349c.01-.006.908-.662 3.632-.662c2.18 0 4.937.6 7.382 1.132c1.858.405 3.468.756 4.453.756L51 27.171c-.894 0-2.456-.338-4.262-.729c-2.474-.539-5.264-1.144-7.522-1.144m.149 4.39c-3.063 0-4.09.776-4.197.865l.264.36l.257.365c.011-.007.927-.691 3.709-.691c2.226 0 5.042.625 7.536 1.18c1.9.424 3.545.79 4.551.79l-.082-.917c-.914 0-2.51-.355-4.354-.762c-2.528-.56-5.377-1.19-7.684-1.19m.156 4.576c-3.127 0-4.177.811-4.288.903l.271.375l.264.38c.008-.008.946-.72 3.786-.72c2.272 0 5.15.652 7.701 1.232c1.94.44 3.621.821 4.649.821l-.086-.955c-.932 0-2.563-.369-4.447-.795c-2.583-.583-5.494-1.241-7.85-1.241m.166 4.776c-3.196 0-4.269.846-4.382.943l.274.392l.271.398c.009-.008.967-.754 3.87-.754c2.323 0 5.265.683 7.872 1.287c1.984.461 3.704.861 4.754.861l-.091-1c-.953 0-2.621-.387-4.546-.832c-2.642-.607-5.617-1.295-8.022-1.295m.17 4.989c-3.268 0-4.365.885-4.48.986l.281.408l.276.416c.011-.008.99-.785 3.957-.785c2.377 0 5.385.713 8.052 1.346c2.029.481 3.788.897 4.863.897l-.095-1.046c-.974 0-2.681-.4-4.651-.866c-2.701-.638-5.745-1.356-8.203-1.356'/%3E%3C/svg%3E" alt="Voice Assistant" />
            
            <h3 className="mt-8 text-xl font-bold">Study Materials</h3>
            <p className="mt-2 text-zinc-400">
            Upload and gain access to an unlimited array of study materials.
            </p>
          </div>
        </div><br></br>
        <div className="flex flex-wrap justify-center gap-8 mb-8 relative z-10">
          <div className="relative w-64 p-6 rounded-lg shadow-lg bg-zinc-800 feature-cards md:mr-7">
            <div className="absolute top-0 p-2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-full left-1/2 feature-circle2">
            </div>
            <img className="absolute top-0 p-2 transform -translate-x-1/2 -translate-y-1/2 left-1/2" width="50" height="50" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0a3 3 0 1 1 3 3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9'/%3E%3Ccircle cx='12' cy='19' r='1' fill='white'/%3E%3C/svg%3E" alt="Assistant" />
            <h3 className="mt-8 text-xl font-bold">Post your doubt</h3>
            <p className="mt-2 text-zinc-400">
            Post your doubts, let others solve them, and get notified when they're solved.
            </p>
          </div>
          <div className="relative w-64 p-6 rounded-lg shadow-lg bg-zinc-800 feature-cards">
            <div className="absolute top-0 p-2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-full left-1/2 feature-circle2">
            </div>
            <img className="absolute top-0 p-2 transform -translate-x-1/2 -translate-y-1/2 left-1/2" width="50" height="50" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Crect width='6' height='6' x='3' y='5' rx='1'/%3E%3Cpath d='m3 17l2 2l4-4m4-9h8m-8 6h8m-8 6h8'/%3E%3C/g%3E%3C/svg%3E" alt="Voice Assistant" />
            <h3 className="mt-8 text-xl font-bold">Todo List</h3>
            <p className="mt-2 text-zinc-400">
            Organize tasks, set deadlines, and track progress with a simple to-do list.
            </p>
          </div>
        </div>
        <img src="https://i.ibb.co/KbwrNN7/welcoming-robot.png" alt="welcoming-robot" border="0" className="robot"/>
        
        {/* Footer */}
        <div className="flex flex-col items-center justify-between pt-8 mt-10 border-t md:flex-row border-zinc-700" id="Contact">
          <div className="flex">
          <img src="https://firebasestorage.googleapis.com/v0/b/study-lighthouse.appspot.com/o/project%20photoes%2Ffooter%20logo.png?alt=media&token=4b75916f-bc71-4caa-96de-1345a5e869cc" alt="Logo" className="w-full md:w-4/6 lg:h-48 md:h-36 sm:h-28 mr-10"/>
          </div>
          <div className="flex flex-col mb-5">
            <h3 className="mb-2 font-bold sm:text-lg md:text-sm lg:text-xl">Contact Us</h3>
            <p className="lg:text-lg md:text-sm sm:text-sm">+91 9999999999</p>
            <p className="lg:text-lg md:text-sm sm:text-sm">xyz@gmail.com</p><br></br>
            {/* <div className="flex mt-0 md:mt-2 items-">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.2 4.2 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.52 8.52 0 0 1-5.33 1.84q-.51 0-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23'/%3E%3C/svg%3E" alt="Twitter" className="mr-2" />
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95'/%3E%3C/svg%3E" alt="Facebook" className="mr-2" />
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.7em' height='1.7em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73'/%3E%3C/svg%3E" alt="Youtube" className="mr-2" />
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3'/%3E%3C/svg%3E" alt="Youtube" className="mr-2" />
            </div> */}
          </div>
          <div className="flex flex-col mb-5">
            <h3 className="mb-2 font-bold sm:text-lg md:text-sm lg:text-xl">Developers</h3>
            <p className="lg:text-lg md:text-sm sm:text-sm">S.V.S. Prajnesh</p>
            <p className="lg:text-lg md:text-sm sm:text-sm">N. Manikanta Swamy</p>
            <p className="lg:text-lg md:text-sm sm:text-sm">T. Vineeth</p>
            <p className="lg:text-lg md:text-sm sm:text-sm">T. Mery Sowmya</p>
            <p className="lg:text-lg md:text-sm sm:text-sm">P. Charishma</p>
          </div>
          <div className="flex mb-5 lg:w-1/6 md:w-1/5 sm:w-4/5">
            <input
              type="text"
              placeholder="Enter queries"
              className="p-2 text-white border rounded-l-lg bg-zinc-800 border-zinc-700 query w-3/5"
              value={query}

              onChange={(e)=>setQuery(e.target.value)}
            />
            <button className="p-2 text-white bg-blue-500 border border-blue-700 rounded-r-lg query-submit w-2/5 lg:text-sm md:text-xs sm:text-sm" onClick={postQuery}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
  

export default function Lander() {
    return(
        <div className="p-4 pr-6 w-screen">
            <Introduction/>
            <About/>
            <Features/>
        </div>
    )
}
