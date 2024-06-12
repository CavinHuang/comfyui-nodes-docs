---
tags:
- Face
- FaceRestoration
---

# Face Fixer OpenCV (Mikey)
## Documentation
- Class name: `FaceFixerOpenCV`
- Category: `Mikey/Utils`
- Output node: `False`

FaceFixerOpenCV is designed to enhance and modify facial features within images using OpenCV. It employs face detection algorithms to identify faces in images and applies various transformations to improve or alter the appearance of these faces, such as resizing, denoising, and blending with other facial features.
## Input types
### Required
- **`image`**
    - The image tensor where faces need to be detected and fixed. It serves as the primary input for face detection and subsequent modifications.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`base_model`**
    - The base model used for generating new facial features or enhancing existing ones.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - The variational autoencoder used for encoding and decoding facial features.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`positive_cond_base`**
    - Base conditioning for positive attributes to enhance or generate in the face.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`negative_cond_base`**
    - Base conditioning for negative attributes to reduce or eliminate in the face.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`face_img_resolution`**
    - The resolution to which the face images are scaled before processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding`**
    - Padding added to the detected face region before processing to include a broader context.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`scale_factor`**
    - A parameter that influences the detection process by specifying how much the image size is reduced at each image scale.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`min_neighbors`**
    - A threshold for determining which detected faces are retained. It represents the minimum number of neighbors each candidate rectangle should have to qualify as a face.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise`**
    - The degree of denoising applied to the face images during processing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`classifier`**
    - Specifies the classifier model to be used for face detection. It determines the type of faces (e.g., anime, frontal, profile) the node is looking for within the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sampler_name`**
    - Specifies the sampling method used for generating or enhancing facial features.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler used for controlling the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cfg`**
    - Configuration settings for the face fixing process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `dict`
- **`steps`**
    - The number of steps in the face fixing process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The modified image tensor with enhanced or altered facial features.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Save Image With Prompt Data](../../mikey_nodes/Nodes/Save Image With Prompt Data.md)



## Source code
```python
class FaceFixerOpenCV:
    @classmethod
    def INPUT_TYPES(s):
        classifiers = ['animeface','combined','haarcascade_frontalface_default.xml', 'haarcascade_profileface.xml',
                       'haarcascade_frontalface_alt.xml', 'haarcascade_frontalface_alt2.xml',
                       'haarcascade_upperbody.xml', 'haarcascade_fullbody.xml', 'haarcascade_lowerbody.xml',
                       'haarcascade_frontalcatface.xml', 'hands']
        return {"required": {"image": ("IMAGE",), "base_model": ("MODEL",), "vae": ("VAE",),
                             "positive_cond_base": ("CONDITIONING",), "negative_cond_base": ("CONDITIONING",),
                             #"model_name": (folder_paths.get_filename_list("upscale_models"), ), USING LANCZOS INSTEAD OF MODEL
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             #"upscale_by": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 10.0, "step": 0.1}),
                             "face_img_resolution": ("INT", {"default": 1024, "min": 512, "max": 2048}),
                             "padding": ("INT", {"default": 32, "min": 0, "max": 512}),
                             "scale_factor": ("FLOAT", {"default": 1.2, "min": 0.1, "max": 10.0, "step": 0.1}),
                             "min_neighbors": ("INT", {"default": 8, "min": 1, "max": 100}),
                             "denoise": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                             "classifier": (classifiers, {"default": 'combined'}),
                             "sampler_name": (comfy.samplers.KSampler.SAMPLERS, {'default': 'dpmpp_2m_sde'}),
                             "scheduler": (comfy.samplers.KSampler.SCHEDULERS, {'default': 'karras'}),
                             "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 1000.0, "step": 0.1}),
                             "steps": ("INT", {"default": 30, "min": 1, "max": 1000})}}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Utils'

    def calculate_iou(self, box1, box2):
        """
        Calculate the Intersection over Union (IoU) of two bounding boxes.

        Parameters:
        box1, box2: The bounding boxes, each defined as [x, y, width, height]

        Returns:
        iou: Intersection over Union as a float.
        """
        # Determine the coordinates of each of the boxes
        x1_min, y1_min, x1_max, y1_max = box1[0], box1[1], box1[0] + box1[2], box1[1] + box1[3]
        x2_min, y2_min, x2_max, y2_max = box2[0], box2[1], box2[0] + box2[2], box2[1] + box2[3]

        # Calculate the intersection area
        intersect_x_min = max(x1_min, x2_min)
        intersect_y_min = max(y1_min, y2_min)
        intersect_x_max = min(x1_max, x2_max)
        intersect_y_max = min(y1_max, y2_max)

        intersect_area = max(0, intersect_x_max - intersect_x_min) * max(0, intersect_y_max - intersect_y_min)

        # Calculate the union area
        box1_area = (x1_max - x1_min) * (y1_max - y1_min)
        box2_area = (x2_max - x2_min) * (y2_max - y2_min)
        union_area = box1_area + box2_area - intersect_area

        # Calculate the IoU
        iou = intersect_area / union_area if union_area != 0 else 0

        return iou

    def detect_faces(self, image, classifier, scale_factor, min_neighbors):
        # before running check if cv2 is installed
        try:
            import cv2
        except ImportError:
            raise Exception('OpenCV is not installed. Please install it using "pip install opencv-python"')
        # detect face
        if classifier == 'animeface':
            p = os.path.dirname(os.path.realpath(__file__))
            p = os.path.join(p, 'haar_cascade_models/animeface.xml')
        elif classifier == 'hands':
            p = os.path.dirname(os.path.realpath(__file__))
            p = os.path.join(p, 'haar_cascade_models/hand_gesture.xml')
        else:
            p = cv2.data.haarcascades + classifier
        face_cascade = cv2.CascadeClassifier(p)
        # convert to numpy array
        image_np = np.clip(255. * image.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
        # Convert the image to grayscale (needed for face detection)
        gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
        # Detect faces in the image
        faces = face_cascade.detectMultiScale(gray, scaleFactor=scale_factor, minNeighbors=min_neighbors, minSize=(32, 32))
        return faces

    def combo_detection(self, image, scale_factor, min_neighbors):
        # front faces
        front_faces = self.detect_faces(image, 'haarcascade_frontalface_default.xml', scale_factor, min_neighbors)
        # profile faces
        profile_faces = self.detect_faces(image, 'haarcascade_profileface.xml', scale_factor, min_neighbors)
        # anime faces
        anime_faces = self.detect_faces(image, 'animeface', scale_factor, min_neighbors)
        # if no faces detected
        if front_faces == () and profile_faces == () and anime_faces == ():
            return front_faces
        if front_faces == () and profile_faces != () and anime_faces == ():
            return profile_faces
        if front_faces != () and profile_faces == () and anime_faces == ():
            return front_faces
        if front_faces == () and profile_faces == () and anime_faces != ():
            return anime_faces
        # combined faces
        arrays = []
        if front_faces != ():
            arrays.append(front_faces)
        if profile_faces != ():
            arrays.append(profile_faces)
        if anime_faces != ():
            arrays.append(anime_faces)
        combined_faces = np.concatenate(arrays, axis=0)
        # removing duplicates
        iou_threshold = 0.2
        faces = []
        for face in combined_faces:
            if len(faces) == 0:
                faces.append(face)
            else:
                iou = [self.calculate_iou(face, f) for f in faces]
                if max(iou) < iou_threshold:
                    faces.append(face)
        return faces

    def run(self, image, base_model, vae, positive_cond_base, negative_cond_base, seed, face_img_resolution=768, padding=8, scale_factor=1.2, min_neighbors=6, denoise=0.25,
            classifier='haarcascade_frontalface_default.xml', sampler_name='dpmpp_3m_sde_gpu', scheduler='exponential', cfg=7.0, steps=30):
        # tools
        image_scaler = ImageScale()
        vaeencoder = VAEEncode()
        vaedecoder = VAEDecode()
        # detect faces
        if classifier == 'combined':
            faces = self.combo_detection(image, scale_factor, min_neighbors)
        else:
            faces = self.detect_faces(image, classifier, scale_factor, min_neighbors)
        # if no faces detected
        if faces == ():
            return (image,)
        result = image.clone()
        # Draw rectangles around each face
        for (x, y, w, h) in faces:
            # factor in padding
            x -= padding
            y -= padding
            w += padding * 2
            h += padding * 2
            # Check if padded region is within bounds of the original image
            x = max(0, x)
            y = max(0, y)
            w = min(w, image.shape[2] - x)
            h = min(h, image.shape[1] - y)
            # crop face
            og_crop = image[:, y:y+h, x:x+w]
            # original size
            org_width, org_height = og_crop.shape[2], og_crop.shape[1]
            # upscale face
            crop = image_scaler.upscale(og_crop, 'lanczos', face_img_resolution, face_img_resolution, 'center')[0]
            samples = vaeencoder.encode(vae, crop)[0]
            samples = common_ksampler(base_model, seed, steps, cfg, sampler_name, scheduler, positive_cond_base, negative_cond_base, samples,
                                      start_step=int((1-(steps*denoise)) // 1), last_step=steps, force_full_denoise=False)[0]
            crop = vaedecoder.decode(vae, samples)[0]
            # resize face back to original size
            crop = image_scaler.upscale(crop, 'lanczos', org_width, org_height, 'center')[0]
            # calculate feather size
            feather = crop.shape[2] // 8
            # the image has 4 dimensions, 1st is the number of images in the batch, 2nd is the height, 3rd is the width, 4th is the number of channels
            mask = torch.ones(1, crop.shape[1], crop.shape[2], crop.shape[3])
            # feather on all sides
            # top feather
            for t in range(feather):
                mask[:, t:t+1, :] *= (1.0 / feather) * (t + 1)
            # left feather
            for t in range(feather):
                mask[:, :, t:t+1] *= (1.0 / feather) * (t + 1)
            # Right feather
            for t in range(feather):
                right_edge_start = crop.shape[2] - feather + t
                mask[:, :, right_edge_start:right_edge_start+1] *= (1.0 - (1.0 / feather) * (t + 1))
            # Bottom feather
            for t in range(feather):
                bottom_edge_start = crop.shape[1] - feather + t
                mask[:, bottom_edge_start:bottom_edge_start+1, :] *= (1.0 - (1.0 / feather) * (t + 1))
            # Apply the feathered mask to the cropped face
            crop = crop * mask
            # Extract the corresponding area on the original image
            original_area = result[:, y:y+h, x:x+w]
            # Apply inverse of the mask to the original area
            inverse_mask = 1 - mask
            original_area = original_area * inverse_mask
            # Add the processed face to the original area
            blended_face = original_area + crop
            # Place the blended face back into the result image
            result[:, y:y+h, x:x+w] = blended_face

        # Convert the result back to the original format if needed
        # (This step depends on how you want to return the image, adjust as necessary)

        # Return the final image
        return (result,)

```
