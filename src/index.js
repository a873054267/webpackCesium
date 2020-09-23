// import('Widgets/widgets.css');
import Viewer from '../cesium/Source/Widgets/Viewer/Viewer'
var viewer = new Viewer('cesiumContainer', {

    baseLayerPicker: false,
    homeButton: false,
    animation: true,
    geocoder: false,
    timeline: false,
    selectionIndicator: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    infoBox: false,
    shouldAnimate: false,
    fullscreenButton: false,
    projectionPicker: false,
    useDefaultRenderLoop: true,
    requestRenderMode: true,
    maximumRenderTimeChange: Infinity,
    contextOptions: {
        requestWebgl2 : true,
        webgl: {
            antialias: true,
            // preserveDrawingBuffer: true
        }
    }
});
// 去掉cesium图标
viewer._cesiumWidget._creditContainer.style.display = 'none';
window.viewer=viewer
// var scene = viewer.scene;
// var primitives = scene.primitives;
// var camera = scene.camera;

// var position = Cesium.Cartesian3.fromDegrees(Math.random(), Math.random());
// debugger
// let v=new Cesium.RectangularSensorGraphics({
//     //gaze: targetEntity,
//     radius: 1000000,
//     xHalfAngle: Cesium.Math.toRadians(45),
//     yHalfAngle: Cesium.Math.toRadians(45),
//     lineColor: new Cesium.Color(0.0, 1.0, 1.0, 1.0),
//     material: new Cesium.Color(0.0, 1.0, 1.0, 0.4),
//     showScanPlane: true,
//     scanPlaneColor: new Cesium.Color(0.0, 1.0, 1.0, 1.0),
//     scanPlaneMode: 'vertical',
//     scanPlaneRate: 3,

// })
// window.v=v
// var entity = viewer.entities.add({
//     position: position,
//     billboard: {
//         scale: 1,
//         image: './facility.html',
//         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//         verticalOrigin: Cesium.VerticalOrigin.CENTER
//     },
//     rectangularSensor: v
// });