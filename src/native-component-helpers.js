var PlaceholderMesh = (function () {
	var placeholderGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
	var placeholderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
	placeholderMaterial.visible = false;
	var PlaceholderMesh = function () {
		THREE.Mesh.call( this, placeholderGeometry, placeholderMaterial );
		this.userData.altspace = {collider: {enabled: false}};
	};
	PlaceholderMesh.prototype = Object.create( THREE.Mesh.prototype );
	PlaceholderMesh.prototype.constructor = THREE.PlaceholderMesh;
	return PlaceholderMesh;
}());

function nativeComponentInit() {
	var mesh = this.el.getOrCreateObject3D('mesh', PlaceholderMesh);
	altspace._internal.callClientFunction('AddNativeComponent', {
		MeshId: mesh.id,
		Type: this.name
	}, { argsType: 'JSTypeAddNativeComponent' });
}
function nativeComponentRemove() {
	var mesh = this.el.getObject3D('mesh');
	altspace._internal.callClientFunction('RemoveNativeComponent', {
		MeshId: mesh.id,
		Type: this.name
	}, { argsType: 'JSTypeRemoveNativeComponent' });
}
function nativeComponentUpdate(oldData) {
	var attributes;
	if(this.data instanceof Object){
		attributes = JSON.stringify(this.data);
	} else {
		attributes = JSON.stringify({singularProperty:this.data});
	}
	altspace._internal.callClientFunction('UpdateNativeComponent', {
		MeshId: this.el.object3DMap.mesh.id,
		ComponentName: this.name,
		Attributes: attributes,
	}, { argsType: 'JSTypeUpdateNativeComponent' });
}

function callComponent(functionName, args) {
	altspace._internal.callClientFunction('CallNativeComponent', {
		MeshId: this.el.object3DMap.mesh.id,
		ComponentName: this.name,
		FunctionName: functionName,
		Arguments: JSON.stringify(args)
	}, { argsType: 'JSTypeCallNativeComponent' });
}

module.exports = {
	nativeComponentInit: nativeComponentInit,
	nativeComponentRemove: nativeComponentRemove,
	nativeComponentUpdate: nativeComponentUpdate,
	callComponent: callComponent,
};
