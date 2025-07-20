/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/UnrealBloomPass */ "./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js");
//23FI022 小川優季





class ThreeJSContainer {
    scene;
    light;
    lanterns;
    particleVelocity;
    composer;
    waterMesh;
    waterNormalMap;
    clock = new three__WEBPACK_IMPORTED_MODULE_4__.Clock();
    directionalLight;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_4__.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_4__.Color(0x181824));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_4__.PerspectiveCamera(90, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 10, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        this.composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_1__.EffectComposer(renderer);
        this.composer.addPass(new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_2__.RenderPass(this.scene, camera));
        const bloomPass = new three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_3__.UnrealBloomPass(new three__WEBPACK_IMPORTED_MODULE_4__.Vector2(window.innerWidth, window.innerHeight), 2.5, 0.6, 0.85);
        this.composer.addPass(bloomPass);
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            this.updateWater();
            this.composer.render();
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_4__.Scene();
        const waterSurfaceY = -5; // 水面のY座標
        const lanternHeight = 1.3; // ランタンの高さ
        const floatOffset = 0.1; // 水面で浮遊する際のY軸オフセット（水面より少し上に浮く）
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_4__.TextureLoader();
        this.waterNormalMap = textureLoader.load('https://threejs.org/examples/textures/water/Water_1_M_Normal.jpg'); // Three.jsのサンプル波紋ノーマルマップ
        this.waterNormalMap.wrapS = this.waterNormalMap.wrapT = three__WEBPACK_IMPORTED_MODULE_4__.RepeatWrapping; // リピート設定
        this.waterNormalMap.repeat.set(10, 10);
        let createWater = () => {
            const waterGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.PlaneGeometry(200, 200, 128, 128);
            const waterMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.MeshStandardMaterial({
                color: 0xffa500,
                metalness: 1.0,
                roughness: 0.0,
                transparent: true,
                opacity: 0.8,
                side: three__WEBPACK_IMPORTED_MODULE_4__.DoubleSide,
                normalMap: this.waterNormalMap,
                normalScale: new three__WEBPACK_IMPORTED_MODULE_4__.Vector2(1.5, 1.5)
            });
            this.waterMesh = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(waterGeometry, waterMaterial);
            this.waterMesh.rotation.x = -Math.PI / 2;
            this.waterMesh.position.y = -5;
            this.scene.add(this.waterMesh);
        };
        let createLanterns = () => {
            //ジオメトリの作成
            const lanternGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.CylinderGeometry(0.6, 0.6, 1.3, 16, 1, true);
            //マテリアルの作成
            const lanternMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.MeshStandardMaterial({ color: 0xffa500, transparent: true, opacity: 0.8, side: three__WEBPACK_IMPORTED_MODULE_4__.DoubleSide });
            const lightGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.BufferGeometry();
            const positions = new Float32Array([0, 0, 0]);
            lightGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_4__.BufferAttribute(positions, 3));
            const textureLoader = new three__WEBPACK_IMPORTED_MODULE_4__.TextureLoader();
            const glowTexture = textureLoader.load('spark1.png');
            const lightMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.PointsMaterial({
                size: 6,
                map: glowTexture,
                blending: three__WEBPACK_IMPORTED_MODULE_4__.AdditiveBlending,
                color: 0xffa500,
                transparent: true,
                opacity: 1,
                depthWrite: false
            });
            //ランタンの作成
            const lanternNum = 500; // パーティクルの数
            this.lanterns = [];
            //this.particleVelocity = [];
            for (let i = 0; i < lanternNum; i++) {
                const lanternGroup = new three__WEBPACK_IMPORTED_MODULE_4__.Group();
                const outerLantern = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(lanternGeometry, lanternMaterial);
                lanternGroup.add(outerLantern);
                const lightPoint = new three__WEBPACK_IMPORTED_MODULE_4__.Points(lightGeometry, lightMaterial);
                lightPoint.position.y = -0.2;
                lanternGroup.add(lightPoint);
                lanternGroup.position.set(80 * Math.random() - 40, // x座標
                waterSurfaceY + (lanternHeight / 2) + Math.random() * 2, // y座標 (地面近く)
                80 * Math.random() - 40 // z座標
                );
                lanternGroup.state = 'rising';
                lanternGroup.targetY = waterSurfaceY + (lanternHeight / 2) + 20 + Math.random() * 10;
                lanternGroup.floatStartY = waterSurfaceY + (lanternHeight / 2) + floatOffset; // 浮遊時の基準Y座標
                lanternGroup.floatStartTime = 0; // 初期化
                lanternGroup.floatDuration = 5 + Math.random() * 5;
                lanternGroup.initialVelocity = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((Math.random() - 0.5) * 0.1, // 横方向の動きは維持
                Math.random() * 0.4 + 0.05, // 上昇速度
                (Math.random() - 0.5) * 0.1);
                this.scene.add(lanternGroup);
                this.lanterns.push(lanternGroup);
            }
        };
        createWater();
        createLanterns();
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_4__.AmbientLight(0x404040);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        this.directionalLight = new three__WEBPACK_IMPORTED_MODULE_4__.DirectionalLight(0xadd8e6, 3); // ⭐ 明るい水色の光、強度3
        this.directionalLight.position.set(0, 50, 0); // 真上から照らす
        this.directionalLight.target.position.set(0, -5, 0); // 水面をターゲットにする
        this.scene.add(this.directionalLight);
        this.scene.add(this.directionalLight.target); // targetオブジェクトもシーンに追加
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        let update = (time) => {
            const deltaTime = this.clock.getDelta();
            const elapsedTime = this.clock.getElapsedTime(); // 経過時間
            for (let i = 0; i < this.lanterns.length; i++) {
                const lantern = this.lanterns[i]; // 型キャスト
                if (lantern.state === 'rising') {
                    // ⭐ 上昇フェーズ ⭐
                    lantern.position.x += deltaTime * lantern.initialVelocity.x;
                    lantern.position.y += deltaTime * lantern.initialVelocity.y;
                    lantern.position.z += deltaTime * lantern.initialVelocity.z;
                    if (lantern.position.y >= lantern.targetY) {
                        lantern.state = 'floating'; // 目標Yに達したら浮遊フェーズへ
                        lantern.floatStartTime = elapsedTime; // 浮遊開始時間を記録
                        // ⭐ 水面まで下降させるのではなく、ここで浮遊開始Y座標を設定 ⭐
                        lantern.floatStartY = lantern.position.y; //現在の位置を浮遊の基準にするか、水面に戻すか
                    }
                }
                else if (lantern.state === 'floating') {
                    // ⭐ 浮遊フェーズ ⭐
                    // ランタンが水面よりかなり上にいる場合、まずは水面まで下降させる
                    const waterSurfaceY = -5;
                    const lanternBaseYActual = lantern.position.y - (lanternHeight / 2); // ランタンの底の現在のY座標
                    if (lanternBaseYActual > waterSurfaceY + floatOffset) {
                        // 重力のように下降
                        lantern.position.y -= deltaTime * 0.4; // 調整可能な下降速度
                        if (lantern.position.y - (lanternHeight / 2) <= waterSurfaceY + floatOffset) {
                            lantern.position.y = waterSurfaceY + (lanternHeight / 2) + floatOffset; // 水面に停止
                            lantern.floatStartTime = elapsedTime; // 浮遊開始時間を再度記録
                        }
                    }
                    else {
                        // 水面で浮遊
                        const timeInFloat = elapsedTime - lantern.floatStartTime;
                        if (timeInFloat < lantern.floatDuration) {
                            // まだ浮遊持続時間内なら浮遊アニメーション
                            const floatAmplitude = 0.1;
                            const floatSpeed = 1.0;
                            lantern.position.y = lantern.floatStartY + Math.sin(timeInFloat * floatSpeed) * floatAmplitude;
                        }
                        else {
                            // ⭐ 浮遊時間が経過したら、再度上昇フェーズに移行 ⭐
                            lantern.state = 'rising';
                            lantern.position.y = lantern.floatStartY; // 浮遊していた位置から上昇を開始
                            // 新しい上昇目標Yと速度を設定
                            lantern.targetY = waterSurfaceY + (lanternHeight / 2) + 20 + Math.random() * 10;
                            lantern.initialVelocity.set((Math.random() - 0.5) * 0.1, Math.random() * 0.4 + 0.05, // 上昇速度
                            (Math.random() - 0.5) * 0.1);
                        }
                    }
                }
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
    // 水面の更新メソッド（簡易的な波紋アニメーション）
    updateWater = () => {
        if (this.waterMesh && this.waterMesh.material instanceof three__WEBPACK_IMPORTED_MODULE_4__.MeshStandardMaterial && this.waterMesh.material.normalMap) {
            const time = this.clock.getElapsedTime();
            const speed = 0.05; // 波の速度
            // ノーマルマップのオフセットを時間で変化させる
            this.waterMesh.material.normalMap.offset.x = time * speed;
            this.waterMesh.material.normalMap.offset.y = time * speed;
            // 透明度の揺らぎは必要なければ削除
            const baseOpacity = 0.9;
            this.waterMesh.material.opacity = baseOpacity + Math.sin(time * 2) * 0.03;
        }
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, -5, 20));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js-node_modules_three_examples-476788"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkYsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEMsQ0FBQzs7Ozs7OztVQ3pSRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NncHJlbmRlcmluZy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLzIzRkkwMjIg5bCP5bed5YSq5a2jXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcblxuaW1wb3J0IHsgRWZmZWN0Q29tcG9zZXIgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL0VmZmVjdENvbXBvc2VyXCI7XG5pbXBvcnQgeyBSZW5kZXJQYXNzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzXCI7XG5pbXBvcnQgeyBVbnJlYWxCbG9vbVBhc3MgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL1VucmVhbEJsb29tUGFzc1wiO1xuXG5pbnRlcmZhY2UgTGFudGVyblN0YXRlIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICAgIHN0YXRlOiAncmlzaW5nJyB8ICdmbG9hdGluZyc7XG4gICAgdGFyZ2V0WTogbnVtYmVyOyAvLyDkuIrmmIfjg5Xjgqfjg7zjgrrjgafjga7nm67mqJlZ5bqn5qiZXG4gICAgZmxvYXRTdGFydFk6IG51bWJlcjsgLy8g5rWu6YGK44OV44Kn44O844K644Gn44Gu5Z+65rqWWeW6p+aomVxuICAgIGZsb2F0U3RhcnRUaW1lOiBudW1iZXI7IC8vIOa1rumBiuODleOCp+ODvOOCuuOBjOWni+OBvuOBo+OBn+aZguWIu1xuICAgIGZsb2F0RHVyYXRpb246IG51bWJlcjtcbiAgICBpbml0aWFsVmVsb2NpdHk6IFRIUkVFLlZlY3RvcjM7IC8vIOWIneacn+mAn+W6puOCkuS/neaMgVxufVxuXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIHNjZW5lOiBUSFJFRS5TY2VuZTtcbiAgICBwcml2YXRlIGxpZ2h0OiBUSFJFRS5MaWdodDtcbiAgICBwcml2YXRlIGxhbnRlcm5zOiBMYW50ZXJuU3RhdGVbXTtcbiAgICBwcml2YXRlIHBhcnRpY2xlVmVsb2NpdHk6IFRIUkVFLlZlY3RvcjNbXTtcbiAgICBwcml2YXRlIGNvbXBvc2VyOiBFZmZlY3RDb21wb3NlcjtcbiAgICBwcml2YXRlIHdhdGVyTWVzaDogVEhSRUUuTWVzaDtcbiAgICBwcml2YXRlIHdhdGVyTm9ybWFsTWFwOiBUSFJFRS5UZXh0dXJlO1xuICAgIHByaXZhdGUgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcbiAgICBwcml2YXRlIGRpcmVjdGlvbmFsTGlnaHQ6IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIC8vIOeUu+mdoumDqOWIhuOBruS9nOaIkCjooajnpLrjgZnjgovmnqDjgZTjgajjgaspKlxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MTgxODI0KSk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTsgLy/jgrfjg6Pjg4njgqbjg57jg4Pjg5fjgpLmnInlirnjgavjgZnjgotcblxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoOTAsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEwLCAwKSk7XG5cbiAgICAgICAgY29uc3Qgb3JiaXRDb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTY2VuZSgpO1xuXG4gICAgICAgIHRoaXMuY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIocmVuZGVyZXIpO1xuICAgICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MobmV3IFJlbmRlclBhc3ModGhpcy5zY2VuZSwgY2FtZXJhKSk7XG5cbiAgICAgICAgY29uc3QgYmxvb21QYXNzID0gbmV3IFVucmVhbEJsb29tUGFzcyhcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IyKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpLFxuICAgICAgICAgICAgMi41LFxuICAgICAgICAgICAgMC42LFxuICAgICAgICAgICAgMC44NVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3MoYmxvb21QYXNzKTtcblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIxyZW5kZXJcbiAgICAgICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVXYXRlcigpO1xuICAgICAgICAgICAgdGhpcy5jb21wb3Nlci5yZW5kZXIoKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44K344O844Oz44Gu5L2c5oiQKOWFqOS9k+OBpzHlm54pXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgICAgIGNvbnN0IHdhdGVyU3VyZmFjZVkgPSAtNTsgLy8g5rC06Z2i44GuWeW6p+aomVxuICAgICAgICBjb25zdCBsYW50ZXJuSGVpZ2h0ID0gMS4zOyAvLyDjg6njg7Pjgr/jg7Pjga7pq5jjgZVcbiAgICAgICAgY29uc3QgZmxvYXRPZmZzZXQgPSAwLjE7IC8vIOawtOmdouOBp+a1rumBiuOBmeOCi+mam+OBrlnou7jjgqrjg5Xjgrvjg4Pjg4jvvIjmsLTpnaLjgojjgorlsJHjgZfkuIrjgavmta7jgY/vvIlcblxuICAgICAgICBjb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcbiAgICAgICAgdGhpcy53YXRlck5vcm1hbE1hcCA9IHRleHR1cmVMb2FkZXIubG9hZCgnaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy90ZXh0dXJlcy93YXRlci9XYXRlcl8xX01fTm9ybWFsLmpwZycpOyAvLyBUaHJlZS5qc+OBruOCteODs+ODl+ODq+azoue0i+ODjuODvOODnuODq+ODnuODg+ODl1xuICAgICAgICB0aGlzLndhdGVyTm9ybWFsTWFwLndyYXBTID0gdGhpcy53YXRlck5vcm1hbE1hcC53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nOyAvLyDjg6rjg5Tjg7zjg4joqK3lrppcbiAgICAgICAgdGhpcy53YXRlck5vcm1hbE1hcC5yZXBlYXQuc2V0KDEwLCAxMCk7XG5cbiAgICAgICAgbGV0IGNyZWF0ZVdhdGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2F0ZXJHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDIwMCwgMjAwLCAxMjgsIDEyOCk7XG4gICAgICAgICAgICBjb25zdCB3YXRlck1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogMHhmZmE1MDAsXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzOiAxLjAsXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiAwLjAsXG4gICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC44LFxuICAgICAgICAgICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgICAgICAgICAgbm9ybWFsTWFwOiB0aGlzLndhdGVyTm9ybWFsTWFwLFxuICAgICAgICAgICAgICAgIG5vcm1hbFNjYWxlOiBuZXcgVEhSRUUuVmVjdG9yMigxLjUsIDEuNSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLndhdGVyTWVzaCA9IG5ldyBUSFJFRS5NZXNoKHdhdGVyR2VvbWV0cnksIHdhdGVyTWF0ZXJpYWwpO1xuICAgICAgICAgICAgdGhpcy53YXRlck1lc2gucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICAgICAgICAgIHRoaXMud2F0ZXJNZXNoLnBvc2l0aW9uLnkgPSAtNTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMud2F0ZXJNZXNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjcmVhdGVMYW50ZXJucyA9ICgpID0+IHtcbiAgICAgICAgICAgIC8v44K444Kq44Oh44OI44Oq44Gu5L2c5oiQXG4gICAgICAgICAgICBjb25zdCBsYW50ZXJuR2VvbWV0cnkgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjYsIDAuNiwgMS4zLCAxNiwgMSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8v44Oe44OG44Oq44Ki44Or44Gu5L2c5oiQXG4gICAgICAgICAgICBjb25zdCBsYW50ZXJuTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmE1MDAsIHRyYW5zcGFyZW50OiB0cnVlLCBvcGFjaXR5OiAwLjgsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpZ2h0R2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDBdKTtcbiAgICAgICAgICAgIGxpZ2h0R2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuICAgICAgICAgICAgY29uc3QgZ2xvd1RleHR1cmUgPSB0ZXh0dXJlTG9hZGVyLmxvYWQoJ3NwYXJrMS5wbmcnKTtcblxuICAgICAgICAgICAgY29uc3QgbGlnaHRNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICAgICAgc2l6ZTogNixcbiAgICAgICAgICAgICAgICBtYXA6IGdsb3dUZXh0dXJlLFxuICAgICAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAweGZmYTUwMCxcbiAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvL+ODqeODs+OCv+ODs+OBruS9nOaIkFxuICAgICAgICAgICAgY29uc3QgbGFudGVybk51bSA9IDUwMDsgLy8g44OR44O844OG44Kj44Kv44Or44Gu5pWwXG4gICAgICAgICAgICB0aGlzLmxhbnRlcm5zID0gW107XG5cbiAgICAgICAgICAgIC8vdGhpcy5wYXJ0aWNsZVZlbG9jaXR5ID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFudGVybk51bTsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsYW50ZXJuR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKSBhcyBMYW50ZXJuU3RhdGU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBvdXRlckxhbnRlcm4gPSBuZXcgVEhSRUUuTWVzaChsYW50ZXJuR2VvbWV0cnksIGxhbnRlcm5NYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgbGFudGVybkdyb3VwLmFkZChvdXRlckxhbnRlcm4pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbGlnaHRQb2ludCA9IG5ldyBUSFJFRS5Qb2ludHMobGlnaHRHZW9tZXRyeSwgbGlnaHRNYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgbGlnaHRQb2ludC5wb3NpdGlvbi55ID0gLTAuMjtcbiAgICAgICAgICAgICAgICBsYW50ZXJuR3JvdXAuYWRkKGxpZ2h0UG9pbnQpO1xuXG4gICAgICAgICAgICAgICAgbGFudGVybkdyb3VwLnBvc2l0aW9uLnNldChcbiAgICAgICAgICAgICAgICAgICAgODAgKiBNYXRoLnJhbmRvbSgpIC0gNDAsIC8vIHjluqfmqJlcbiAgICAgICAgICAgICAgICAgICAgd2F0ZXJTdXJmYWNlWSArIChsYW50ZXJuSGVpZ2h0IC8gMikgKyBNYXRoLnJhbmRvbSgpICogMiwgIC8vIHnluqfmqJkgKOWcsOmdoui/keOBjylcbiAgICAgICAgICAgICAgICAgICAgODAgKiBNYXRoLnJhbmRvbSgpIC0gNDAgIC8vIHrluqfmqJlcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgbGFudGVybkdyb3VwLnN0YXRlID0gJ3Jpc2luZyc7XG4gICAgICAgICAgICAgICAgbGFudGVybkdyb3VwLnRhcmdldFkgPSB3YXRlclN1cmZhY2VZICsgKGxhbnRlcm5IZWlnaHQgLyAyKSArIDIwICsgTWF0aC5yYW5kb20oKSAqIDEwO1xuXG4gICAgICAgICAgICAgICAgbGFudGVybkdyb3VwLmZsb2F0U3RhcnRZID0gd2F0ZXJTdXJmYWNlWSArIChsYW50ZXJuSGVpZ2h0IC8gMikgKyBmbG9hdE9mZnNldDsgLy8g5rWu6YGK5pmC44Gu5Z+65rqWWeW6p+aomVxuICAgICAgICAgICAgICAgIGxhbnRlcm5Hcm91cC5mbG9hdFN0YXJ0VGltZSA9IDA7IC8vIOWIneacn+WMllxuICAgICAgICAgICAgICAgIGxhbnRlcm5Hcm91cC5mbG9hdER1cmF0aW9uID0gNSArIE1hdGgucmFuZG9tKCkgKiA1O1xuXG4gICAgICAgICAgICAgICAgbGFudGVybkdyb3VwLmluaXRpYWxWZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKFxuICAgICAgICAgICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjEsIC8vIOaoquaWueWQkeOBruWLleOBjeOBr+e2reaMgVxuICAgICAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMC40ICsgMC4wNSwgLy8g5LiK5piH6YCf5bqmXG4gICAgICAgICAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuMVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChsYW50ZXJuR3JvdXApO1xuICAgICAgICAgICAgICAgIHRoaXMubGFudGVybnMucHVzaChsYW50ZXJuR3JvdXApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVXYXRlcigpO1xuICAgICAgICBjcmVhdGVMYW50ZXJucygpO1xuXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NDA0MDQwKTtcbiAgICAgICAgY29uc3QgbHZlYyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpLm5vcm1hbGl6ZSgpO1xuICAgICAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldChsdmVjLngsIGx2ZWMueSwgbHZlYy56KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5saWdodCk7XG5cbiAgICAgICAgdGhpcy5kaXJlY3Rpb25hbExpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhZGQ4ZTYsIDMpOyAvLyDirZAg5piO44KL44GE5rC06Imy44Gu5YWJ44CB5by35bqmM1xuICAgICAgICB0aGlzLmRpcmVjdGlvbmFsTGlnaHQucG9zaXRpb24uc2V0KDAsIDUwLCAwKTsgLy8g55yf5LiK44GL44KJ54Wn44KJ44GZXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uYWxMaWdodC50YXJnZXQucG9zaXRpb24uc2V0KDAsIC01LCAwKTsgLy8g5rC06Z2i44KS44K/44O844Ky44OD44OI44Gr44GZ44KLXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZGlyZWN0aW9uYWxMaWdodCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZGlyZWN0aW9uYWxMaWdodC50YXJnZXQpOyAvLyB0YXJnZXTjgqrjg5bjgrjjgqfjgq/jg4jjgoLjgrfjg7zjg7Pjgavov73liqBcblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIzmm7TmlrBcbiAgICAgICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhVGltZSA9IHRoaXMuY2xvY2suZ2V0RGVsdGEoKTtcbiAgICAgICAgICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gdGhpcy5jbG9jay5nZXRFbGFwc2VkVGltZSgpOyAvLyDntYzpgY7mmYLplpNcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxhbnRlcm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFudGVybiA9IHRoaXMubGFudGVybnNbaV0gYXMgTGFudGVyblN0YXRlOyAvLyDlnovjgq3jg6Pjgrnjg4hcblxuICAgICAgICAgICAgICAgIGlmIChsYW50ZXJuLnN0YXRlID09PSAncmlzaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvLyDirZAg5LiK5piH44OV44Kn44O844K6IOKtkFxuICAgICAgICAgICAgICAgICAgICBsYW50ZXJuLnBvc2l0aW9uLnggKz0gZGVsdGFUaW1lICogbGFudGVybi5pbml0aWFsVmVsb2NpdHkueDtcbiAgICAgICAgICAgICAgICAgICAgbGFudGVybi5wb3NpdGlvbi55ICs9IGRlbHRhVGltZSAqIGxhbnRlcm4uaW5pdGlhbFZlbG9jaXR5Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxhbnRlcm4ucG9zaXRpb24ueiArPSBkZWx0YVRpbWUgKiBsYW50ZXJuLmluaXRpYWxWZWxvY2l0eS56O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYW50ZXJuLnBvc2l0aW9uLnkgPj0gbGFudGVybi50YXJnZXRZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYW50ZXJuLnN0YXRlID0gJ2Zsb2F0aW5nJzsgLy8g55uu5qiZWeOBq+mBlOOBl+OBn+OCiea1rumBiuODleOCp+ODvOOCuuOBuFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFudGVybi5mbG9hdFN0YXJ0VGltZSA9IGVsYXBzZWRUaW1lOyAvLyDmta7pgYrplovlp4vmmYLplpPjgpLoqJjpjLJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOKtkCDmsLTpnaLjgb7jgafkuIvpmY3jgZXjgZvjgovjga7jgafjga/jgarjgY/jgIHjgZPjgZPjgafmta7pgYrplovlp4tZ5bqn5qiZ44KS6Kit5a6aIOKtkFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFudGVybi5mbG9hdFN0YXJ0WSA9IGxhbnRlcm4ucG9zaXRpb24ueTsgLy/nj77lnKjjga7kvY3nva7jgpLmta7pgYrjga7ln7rmupbjgavjgZnjgovjgYvjgIHmsLTpnaLjgavmiLvjgZnjgYtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYW50ZXJuLnN0YXRlID09PSAnZmxvYXRpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOKtkCDmta7pgYrjg5Xjgqfjg7zjgrog4q2QXG4gICAgICAgICAgICAgICAgICAgIC8vIOODqeODs+OCv+ODs+OBjOawtOmdouOCiOOCiuOBi+OBquOCiuS4iuOBq+OBhOOCi+WgtOWQiOOAgeOBvuOBmuOBr+awtOmdouOBvuOBp+S4i+mZjeOBleOBm+OCi1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3YXRlclN1cmZhY2VZID0gLTU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhbnRlcm5CYXNlWUFjdHVhbCA9IGxhbnRlcm4ucG9zaXRpb24ueSAtIChsYW50ZXJuSGVpZ2h0IC8gMik7IC8vIOODqeODs+OCv+ODs+OBruW6leOBruePvuWcqOOBrlnluqfmqJlcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGFudGVybkJhc2VZQWN0dWFsID4gd2F0ZXJTdXJmYWNlWSArIGZsb2F0T2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDph43lipvjga7jgojjgYbjgavkuIvpmY1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxhbnRlcm4ucG9zaXRpb24ueSAtPSBkZWx0YVRpbWUgKiAwLjQ7IC8vIOiqv+aVtOWPr+iDveOBquS4i+mZjemAn+W6plxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhbnRlcm4ucG9zaXRpb24ueSAtIChsYW50ZXJuSGVpZ2h0IC8gMikgPD0gd2F0ZXJTdXJmYWNlWSArIGZsb2F0T2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFudGVybi5wb3NpdGlvbi55ID0gd2F0ZXJTdXJmYWNlWSArIChsYW50ZXJuSGVpZ2h0IC8gMikgKyBmbG9hdE9mZnNldDsgLy8g5rC06Z2i44Gr5YGc5q2iXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFudGVybi5mbG9hdFN0YXJ0VGltZSA9IGVsYXBzZWRUaW1lOyAvLyDmta7pgYrplovlp4vmmYLplpPjgpLlho3luqboqJjpjLJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOawtOmdouOBp+a1rumBilxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZUluRmxvYXQgPSBlbGFwc2VkVGltZSAtIGxhbnRlcm4uZmxvYXRTdGFydFRpbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aW1lSW5GbG9hdCA8IGxhbnRlcm4uZmxvYXREdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOBvuOBoOa1rumBiuaMgee2muaZgumWk+WGheOBquOCiea1rumBiuOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZsb2F0QW1wbGl0dWRlID0gMC4xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZsb2F0U3BlZWQgPSAxLjA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFudGVybi5wb3NpdGlvbi55ID0gbGFudGVybi5mbG9hdFN0YXJ0WSArIE1hdGguc2luKHRpbWVJbkZsb2F0ICogZmxvYXRTcGVlZCkgKiBmbG9hdEFtcGxpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g4q2QIOa1rumBiuaZgumWk+OBjOe1jOmBjuOBl+OBn+OCieOAgeWGjeW6puS4iuaYh+ODleOCp+ODvOOCuuOBq+enu+ihjCDirZBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW50ZXJuLnN0YXRlID0gJ3Jpc2luZyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFudGVybi5wb3NpdGlvbi55ID0gbGFudGVybi5mbG9hdFN0YXJ0WTsgLy8g5rWu6YGK44GX44Gm44GE44Gf5L2N572u44GL44KJ5LiK5piH44KS6ZaL5aeLXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmlrDjgZfjgYTkuIrmmIfnm67mqJlZ44Go6YCf5bqm44KS6Kit5a6aXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFudGVybi50YXJnZXRZID0gd2F0ZXJTdXJmYWNlWSArIChsYW50ZXJuSGVpZ2h0IC8gMikgKyAyMCArIE1hdGgucmFuZG9tKCkgKiAxMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW50ZXJuLmluaXRpYWxWZWxvY2l0eS5zZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDAuNCArIDAuMDUsIC8vIOS4iuaYh+mAn+W6plxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cblxuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICB9XG5cbiAgICAvLyDmsLTpnaLjga7mm7TmlrDjg6Hjgr3jg4Pjg4nvvIjnsKHmmJPnmoTjgarms6LntIvjgqLjg4vjg6Hjg7zjgrfjg6fjg7PvvIlcbiAgICBwcml2YXRlIHVwZGF0ZVdhdGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy53YXRlck1lc2ggJiYgdGhpcy53YXRlck1lc2gubWF0ZXJpYWwgaW5zdGFuY2VvZiBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCAmJiB0aGlzLndhdGVyTWVzaC5tYXRlcmlhbC5ub3JtYWxNYXApIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmNsb2NrLmdldEVsYXBzZWRUaW1lKCk7XG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMDU7IC8vIOazouOBrumAn+W6plxuXG4gICAgICAgICAgICAvLyDjg47jg7zjg57jg6vjg57jg4Pjg5fjga7jgqrjg5Xjgrvjg4Pjg4jjgpLmmYLplpPjgaflpInljJbjgZXjgZvjgotcbiAgICAgICAgICAgIHRoaXMud2F0ZXJNZXNoLm1hdGVyaWFsLm5vcm1hbE1hcC5vZmZzZXQueCA9IHRpbWUgKiBzcGVlZDtcbiAgICAgICAgICAgIHRoaXMud2F0ZXJNZXNoLm1hdGVyaWFsLm5vcm1hbE1hcC5vZmZzZXQueSA9IHRpbWUgKiBzcGVlZDtcblxuICAgICAgICAgICAgLy8g6YCP5piO5bqm44Gu5o+644KJ44GO44Gv5b+F6KaB44Gq44GR44KM44Gw5YmK6ZmkXG4gICAgICAgICAgICBjb25zdCBiYXNlT3BhY2l0eSA9IDAuOTtcbiAgICAgICAgICAgIHRoaXMud2F0ZXJNZXNoLm1hdGVyaWFsLm9wYWNpdHkgPSBiYXNlT3BhY2l0eSArIE1hdGguc2luKHRpbWUgKiAyKSAqIDAuMDM7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcblxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTUsIDIwKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlcy00NzY3ODhcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=