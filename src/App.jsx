// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import beforeGif from './assets/before.gif';
import afterGif from './assets/after.gif';

function App() {
  const [searchParams] = useSearchParams();
  let name1 = searchParams.get('me')?.toLowerCase() || 'together';
  const name2 = searchParams.get('you')?.toLowerCase() || 'forever';

  const [pressCount, setPressCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const specialChars = {
    a: "\uE130", // a.ss01
    b: "\uE131", // b.ss01
    c: "\uE132", // c.ss01
    d: "\uE133", // d.ss01
    e: "\uE134", // e.ss01
    f: "\uE135", // f.ss01
    g: "\uE136", // g.ss01
    h: "\uE137", // h.ss01
    i: "\uE138", // i.ss01
    j: "\uE139", // j.ss01
    k: "\uE140", // k.ss01
    l: "\uE141", // l.ss01
    m: "\uE142", // m.ss01
    n: "\uE143", // n.ss01
    o: "\uE144", // o.ss01
    p: "\uE145", // p.ss01
    q: "\uE146", // q.ss01
    r: "\uE147", // r.ss01
    s: "\uE148", // s.ss01
    t: "\uE149", // t.ss01
    u: "\uE150", // u.ss01
    v: "\uE151", // v.ss01
    w: "\uE152", // w.ss01
    x: "\uE153", // x.ss01
    y: "\uE154", // y.ss01
    z: "\uE129", // z.titl
  };

  const transformName1 = (name) => {
    if (name.length > 1) {
      let lastChar = name[name.length - 1].toLowerCase();
      if (specialChars[lastChar]) {
        return name.slice(0, -1) + specialChars[lastChar];
      }
    }
    return name;
  };
  name1 = transformName1(name1);

  const noTexts = [
    'No',
    'pleaseee',
    'pleaseeeeeeeeee',
    '💐pretty pleaseee',
    'Pretty pleaseee with a 🍒 cherry on top',
    'but- i really love you',
    "🥺🥺",
    'please baby dont say maybe 💕',
    ''
  ];
  const maxPresses = 8;

  const handleYesClick = () => {
    setYesPressed(true);
  };

  const handleNoClick = () => {
    if (pressCount < maxPresses) {
      setPressCount(pressCount + 1);
    }
  };

  const [dimensions, setDimensions] = useState({
    yesWidth: 150,
    yesHeight: 50,
    noWidth: 150,
    maxYesWidth: window.innerWidth,
    maxYesHeight: window.innerHeight - 50,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions((prev) => ({
        ...prev,
        maxYesWidth: window.innerWidth,
        maxYesHeight: window.innerHeight - 50,
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const {
      maxYesWidth,
      maxYesHeight,
    } = dimensions;
    const initialYesWidth = 200;
    const initialYesHeight = 50;

    const yesWidthIncrement = (maxYesWidth - initialYesWidth) / maxPresses;
    const yesHeightIncrement = (maxYesHeight - initialYesHeight) / maxPresses;

    setDimensions((prev) => ({
      ...prev,
      yesWidth: initialYesWidth - 50 + yesWidthIncrement * pressCount,
      yesHeight: initialYesHeight + yesHeightIncrement * pressCount,
    }));
  }, [pressCount, dimensions.maxYesWidth, dimensions.maxYesHeight]);

  const { yesWidth, yesHeight, noWidth } = dimensions;
  const noButtonText = noTexts[pressCount % noTexts.length];
  const currentGif = yesPressed ? afterGif : beforeGif;
  const title = yesPressed ? `${name1}${name2}` : 'Will you be my Valentine?';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputName1, setInputName1] = useState('Name1');
  const [inputName2, setInputName2] = useState('Name2');
  const [urlGenerated, setUrlGenerated] = useState('');
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const generateURL = () => {
    const baseURL = window.location.origin + window.location.pathname;
    const newURL = `${baseURL}?me=${encodeURIComponent(inputName1)}&you=${encodeURIComponent(inputName2)}`;
    navigator.clipboard.writeText(newURL);
    setUrlGenerated(newURL);
    setShowCopiedMessage(true);
  };

  useEffect(() => {
    let timer;
    if (showCopiedMessage) {
      timer = setTimeout(() => {
        setShowCopiedMessage(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showCopiedMessage]);

  return (
    <div className="container">
      <h1 className={yesPressed ? 'question styled' : 'question'}>{title}</h1>
      <img src={currentGif} alt="Display GIF" className="display-gif" />
      {!yesPressed ? (
        <div className="button-container">
          <motion.button
            className="button yes-button"
            animate={{ width: yesWidth, height: yesHeight }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onClick={handleYesClick}
            style={{ minWidth: 50, minHeight: 50 }}
          >
            Yes
          </motion.button>
          {pressCount < maxPresses && (
            <motion.button
              className="button no-button"
              animate={{ width: noWidth }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onClick={handleNoClick}
              style={{ minWidth: 50, minHeight: 50 }}
            >
              {noButtonText}
            </motion.button>
          )}
        </div>
      ) : (
        <h2 className='styled question' style={{fontSize: "300%"}}>(づ๑•ᴗ•๑)づ <br/>❤♡I love you too♡❤</h2>
      )}

      {yesPressed && (
        <>
          <button className="generate-url-button" onClick={() => setIsModalOpen(true)}>
            Make It Yours
          </button>

          {isModalOpen && (
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Enter your names 💍</h2>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={inputName1}
                  onChange={(e) => setInputName1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter second name"
                  value={inputName2}
                  onChange={(e) => setInputName2(e.target.value)}
                />
                <button className="button generate-button" onClick={generateURL}>
                  Generate link
                </button>
                <button className="button close-button" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
                {urlGenerated && (
                  <p className="generated-url">
                    link: <a href={urlGenerated}>{urlGenerated}</a>
                  </p>
                )}
                {showCopiedMessage && (
                  <div className="copied-message">
                    URL copied to clipboard!
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;