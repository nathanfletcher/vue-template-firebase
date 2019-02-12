<template>
        <div>
            <h5>Firebase File Upload</h5>
    
            <input @click.native="selectFile" id="files" type="file" name="file" ref="uploadInput" accept="image/*"
                :multiple="true" value="upload" @change="detectFiles2($event)" />
            <button @click="uploadMultiple()">upload</button>
            <!-- <button @click="alert(selectedFileList)" > Beta Upload</button> -->
            <p v-if="uploading" >Uploading Files... {{progressUpload}}%</p>
            <img v-if="uploadEnd" :src="downloadURL" width="100%" />
            <!-- <div v-if="uploadEnd">
                <v-btn class="ma-0" dark small color="error" @click="deleteImage()">
                    Delete
                </v-btn>
            </div> -->
        </div>
    </template>
    
    <script>
        /* eslint-disable */
        // Thanks Marcelo Forclaz(https://github.com/CristalT) https://gist.github.com/CristalT/2651023cfa2f36cddd119fd979581893
        // Thanks Matteo Leoni(https://github.com/signalkuppe) https://github.com/signalkuppe/vuetify-cloudinary-upload/blob/master/src/components/v-cloudinary-upload.vue
        import * as firebase from 'firebase'
        //import 'firebase/storage';
        //var firestorage = firebase.storage();
        export default {
            name: "firebase-file-upload",
            data() {
                return {
                    progressUpload: 0,
                    fileName: '',
                    uploadTask: '',
                    uploading: false,
                    uploadingText:'',
                    uploadEnd: false,
                    downloadURL: [],
                    selectedFileList: [],
                    donloadURLs: []
                }
            },
            methods: {
                alert(message) {
                    alert("Message: " + message)
                },
                selectFile() {
                    this.$refs.uploadInput.click()
                },
                detectFiles(e) {
                    let fileList = e.target.files || e.dataTransfer.files
                    Array.from(Array(fileList.length).keys()).map(x => {
                        this.fileName(fileList[x])
                    })
                },
                upload(file) {
                    this.fileName = file.name
                    this.uploading = true
                    this.uploadTask = firebase.storage().ref('images/' + file.name).put(file)
                },
                async detectFiles2(e) {
                    let vm = this;
                    for (let i = 0; i < e.target.files.length; i++) {
                        //e.target.files[i];
                        console.log("Detected file change 2", e.target.files[i])
                        //let link = await uploadFileAsPromise(imageFile);
                        //console.log("The donload link " + fileList);
                        vm.selectedFileList.push(e.target.files[i]);
                        //updateFileList();
                        //await this.uploadMultiple(e.target.files[i])
                    }
                },
                async uploadMultiple() {
                    let vm = this;
                    this.uploading = true;
                    let currentFile;
                    for (currentFile in vm.selectedFileList) {
                        console.log("current file ",vm.selectedFileList[currentFile].name)
                        
                        let storageRef = firebase.storage().ref("ketecodeTemplate/" + vm.selectedFileList[currentFile].name)
                        //Upload file
                        let task = storageRef.put(vm.selectedFileList[currentFile])
    
                        //Update progress bar
                        task.on('state_changed',
                            function progress(snapshot) {
                                //console.log(snapshot)
                                console.log("Uploading...")
                                vm.progressUpload = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                            },
                            function error(err) {
                                alert("Something went wrong during upload of " + file.name + "/" + err)
                                console.log(err);
                            },
                            function complete() {
                                task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                    console.log("Upload complete ", downloadURL);
                                    //resolve(downloadURL)
                                    vm.donloadURLs.push(downloadURL)
                                    return downloadURL
                                });
    
                            }
                        );
                        vm.uploadingText = vm.selectedFileList[currentFile].name
                    }
    
                    console.log("The task obj ", task)
                },
                deleteImage() {
                    firebase.storage()
                        .ref('images/' + this.fileName)
                        .delete()
                        .then(() => {
                            this.uploading = false
                            this.uploadEnd = false
                            this.downloadURL = ''
                        })
                    /* .catch((error) => {
                      console.error(`file delete error occured: ${error}`)
                    }) */
                }
            },
            watch: {
                uploadTask: function () {
                    this.uploadTask.on('state_changed', sp => {
                        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
                    },
                        null,
                        () => {
                            this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                                this.uploadEnd = true
                                this.downloadURL = downloadURL
                                this.$emit('downloadURL', downloadURL)
                            })
                        })
                }
            }
        }
    </script>
    
    <style>
        .progress-bar {
            margin: 10px 0;
        }
    </style>