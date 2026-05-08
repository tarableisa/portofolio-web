import './App.css';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Course from './components/Course';
import Certification from './components/Certification';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="profile">
        <Profile />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="courses">
        <Course />
      </div>
      <div id="certifications">
        <Certification />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <Footer />
    </div>
  );
}

export default App;
