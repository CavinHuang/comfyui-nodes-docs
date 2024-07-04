
# Documentation
- Class name: SpectreImg2SMPL
- Category: MotionDiff
- Output node: False

SpectreImg2SMPL节点旨在使用Spectre模型将图像转换为3D模型，专注于从输入图像生成SMPL（Skinned Multi-Person Linear）模型。它处理图像以检测面部特征点，裁剪并规范化面部周围的图像，然后利用这些预处理后的图像生成3D表示，包括顶点和相机参数，适用于进一步的3D渲染或分析。

# Input types
## Required
- spectre_model
    - spectre_model参数是一个包含面部跟踪器和Spectre模型本身的元组，对于检测面部特征点和从输入图像生成3D模型至关重要。
    - Comfy dtype: SPECTRE_MODEL
    - Python dtype: Tuple[FaceTracker, Spectre]
- image
    - image参数代表要转换为3D模型的输入图像。在被Spectre模型处理之前，它会经过预处理，如在面部周围进行裁剪。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- chunk_size
    - chunk_size参数决定了在单个批次中处理的图像数量，优化模型操作的性能和效率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- SMPL_MULTIPLE_SUBJECTS
    - SMPL_MULTIPLE_SUBJECTS输出包含生成模型的3D顶点，对于构建3D网格至关重要。
    - Comfy dtype: SMPL_MULTIPLE_SUBJECTS
    - Python dtype: torch.Tensor
- CROPPED_FACE_IMAGE
    - CROPPED_FACE_IMAGE输出包括已经裁剪和规范化的预处理图像，可用于进一步处理或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SpectreImg2SMPL:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "spectre_model": ("SPECTRE_MODEL", ),
                "image": ("IMAGE", ),
                "chunk_size": ("INT", {"default": 50, "min": 10, "max": 100})
            }
        }
    
    RETURN_TYPES = ("SMPL_MULTIPLE_SUBJECTS", "IMAGE")
    RETURN_NAMES = ("SMPL_MULTIPLE_SUBJECTS", "CROPPED_FACE_IMAGE")
    FUNCTION = "sample"
    CATEGORY = "MotionDiff"

    def get_landmarks(self, face_tracker, image_batch):
        face_info = collections.defaultdict(list)
        pbar = comfy.utils.ProgressBar(len(image_batch))
        for image in tqdm(image_batch):    
            detected_faces = face_tracker.face_detector(image, rgb=True)
            # -- face alignment
            landmarks, scores = face_tracker.landmark_detector(image, detected_faces, rgb=True)
            face_info['bbox'].append(detected_faces)
            face_info['landmarks'].append(landmarks)
            face_info['landmarks_scores'].append(scores)
            pbar.update(1)
        pbar.update_absolute(0, 0)
        return get_landmarks(face_info)

    def sample(self, spectre_model, image, chunk_size):
        face_tracker, spectre = spectre_model
        image = image.numpy().__mul__(255.).astype(np.uint8)
        landmarks = self.get_landmarks(face_tracker, image)
        landmarks = landmarks_interpolate(landmarks)
        images_list = list(image)
        
        """ SPECTRE uses a temporal convolution of size 5. 
        Thus, in order to predict the parameters for a contiguous video with need to 
        process the video in chunks of overlap 2, dropping values which were computed from the 
        temporal kernel which uses pad 'same'. For the start and end of the video we
        pad using the first and last frame of the video. 
        e.g., consider a video of size 48 frames and we want to predict it in chunks of 20 frames 
        (due to memory limitations). We first pad the video two frames at the start and end using
        the first and last frames correspondingly, making the video 52 frames length.
        
        Then we process independently the following chunks:
        [[ 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19]
        [16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35]
        [32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51]]
        
        In the first chunk, after computing the 3DMM params we drop 0,1 and 18,19, since they were computed 
        from the temporal kernel with padding (we followed the same procedure in training and computed loss 
        only from valid outputs of the temporal kernel) In the second chunk, we drop 16,17 and 34,35, and in 
        the last chunk we drop 32,33 and 50,51. As a result we get:
        [2..17], [18..33], [34..49] (end included) which correspond to all frames of the original video 
        (removing the initial padding).     
        """

        # pad
        images_list.insert(0,images_list[0])
        images_list.insert(0,images_list[0])
        images_list.append(images_list[-1])
        images_list.append(images_list[-1])

        landmarks.insert(0,landmarks[0])
        landmarks.insert(0,landmarks[0])
        landmarks.append(landmarks[-1])
        landmarks.append(landmarks[-1])

        landmarks = np.stack(landmarks)

        L = chunk_size

        # create lists of overlapping indices
        indices = list(range(len(images_list)))
        overlapping_indices = [indices[i: i + L] for i in range(0, len(indices), L-4)]

        if len(overlapping_indices[-1]) < 5:
            # if the last chunk has less than 5 frames, pad it with the semilast frame
            overlapping_indices[-2] = overlapping_indices[-2] + overlapping_indices[-1]
            overlapping_indices[-2] = np.unique(overlapping_indices[-2]).astype(np.int32).tolist()
            overlapping_indices = overlapping_indices[:-1]

        # doesn't work if length is not divisible to chunk_size
        # overlapping_indices = np.array(overlapping_indices)

        images_list = np.stack(images_list) # do this to index with multiple indices
        all_verts = []
        all_cams = []
        all_cropped_images = []

        # torch.no_grad() isn't needed as the context of ComfyUI's nodes already has torch.inference_mode(True)
        pbar = comfy.utils.ProgressBar(len(overlapping_indices))
        for chunk_id in tqdm(range(len(overlapping_indices))):
            print('Processing frames {} to {}'.format(overlapping_indices[chunk_id][0], overlapping_indices[chunk_id][-1]))
            images_chunk = images_list[overlapping_indices[chunk_id]]

            landmarks_chunk = landmarks[overlapping_indices[chunk_id]]

            _images_list = []

            """ load each image and crop it around the face if necessary """
            for j in range(len(images_chunk)):
                frame = images_chunk[j]
                kpt = landmarks_chunk[j]

                tform = crop_face(frame,kpt,scale=1.6)
                cropped_image = warp(frame, tform.inverse, output_shape=(224, 224))

                _images_list.append(cropped_image.transpose(2,0,1))

            images_array = torch.from_numpy(np.stack(_images_list)).type(dtype = torch.float32).to(get_torch_device()) #K.3,224,224

            codedict, initial_deca_exp, initial_deca_jaw = spectre.encode(images_array)
            codedict['exp'] = codedict['exp'] + initial_deca_exp
            codedict['pose'][..., 3:] = codedict['pose'][..., 3:] + initial_deca_jaw
            
            opdict = spectre.decode(codedict, rendering=False, vis_lmk=False, return_vis=False)

            for key in codedict.keys():
                """ filter out invalid indices - see explanation at the top of the function """

                if chunk_id == 0 and chunk_id == len(overlapping_indices) - 1:
                    pass
                elif chunk_id == 0:
                    codedict[key] = codedict[key][:-2]
                elif chunk_id == len(overlapping_indices) - 1:
                    codedict[key] = codedict[key][2:]
                else:
                    codedict[key] = codedict[key][2:-2]
            
            for key in opdict.keys():
                """ filter out invalid indices - see explanation at the top of the function """

                if chunk_id == 0 and chunk_id == len(overlapping_indices) - 1:
                    pass
                elif chunk_id == 0:
                    opdict[key] = opdict[key][:-2]
                elif chunk_id == len(overlapping_indices) - 1:
                    opdict[key] = opdict[key][2:]
                else:
                    opdict[key] = opdict[key][2:-2]

            all_verts.append(opdict["verts"].cpu().detach())
            all_cams.append(codedict["cam"].cpu().detach())
            all_cropped_images.append(codedict["images"].cpu().detach())
            pbar.update(1)
        
        all_verts, all_cams, all_cropped_images = torch.cat(all_verts)[2:-2], torch.cat(all_cams)[2:-2], torch.cat(all_cropped_images)[2:-2]
        trans_verts = util.batch_orth_proj(all_verts, all_cams)
        trans_verts[:, :, 1:] = -trans_verts[:, :, 1:]
        trans_verts[:,:,2] = trans_verts[:,:,2] + 10

        # from observation
        for i in range(len(trans_verts)):
            mesh = trimesh.Trimesh(vertices=trans_verts[i])
            rot_matrix = trimesh.transformations.rotation_matrix(math.pi, direction=[1, 1, 0], point=[0, 0, 0])
            mesh.apply_transform(rot_matrix)
            trans_verts[i] = torch.from_numpy(mesh.vertices)
        all_verts = list(all_verts.unsqueeze(1))

        # Match PerspectiveCamera with IntrinsicsCamera
        # https://github.com/mmatl/pyrender/blob/master/pyrender/camera.py
        # cx, cy = width / 2, height / 2 by default
        yfov = torch.Tensor([0.06]) #From observation again
        focal_length = (1/torch.tan(yfov/2)) * (224 / 2) # P[0][0] = 2.0 * fx / width = 1.0 / (aspect_ratio * np.tan(self.yfov / 2.0))
        all_cropped_images = rearrange(all_cropped_images, "n c h w -> n h w c")

        return ((all_verts, {
            "frame_width": 224, "frame_height": 224, "vertical_flip": True,
            "focal_length": focal_length,
            "faces": spectre.flame.faces_tensor.cpu().detach()
        }), all_cropped_images)

```
