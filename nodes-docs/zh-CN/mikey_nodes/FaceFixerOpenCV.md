# Documentation
- Class name: FaceFixerOpenCV
- Category: Mikey/Utils
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

FaceFixerOpenCV节点旨在使用一系列面部检测和图像处理技术增强和修正图像中的面部特征。它利用OpenCV进行面部检测，并应用先进算法来细化和融合面部，确保在原始图像中修正后的面部能够无缝集成。

# Input types
## Required
- image
    - 输入图像是将执行面部修正操作的对象。它作为节点内所有后续处理和分析的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- base_model
    - 基础模型用于节点内的特征提取和处理。它在确定面部特征增强的质量和准确性方面起着关键作用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- vae
    - 变分自编码器（VAE）用于编码和解码面部特征。它在节点内的特征转换和重建过程中至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- positive_cond_base
    - 正向调节基础，用于引导面部特征增强过程朝着期望的结果发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative_cond_base
    - 负向调节基础，用于在增强过程中抑制某些面部特征或特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
## Optional
- seed
    - 用于面部特征增强过程中随机元素的随机种子。它确保了结果的可复现性。
    - Comfy dtype: INT
    - Python dtype: int
- face_img_resolution
    - 处理面部图像的分辨率。它影响细节水平和计算负载。
    - Comfy dtype: INT
    - Python dtype: int
- padding
    - 在处理前应用于检测到的面部的填充量。它有助于保留边缘的面部细节。
    - Comfy dtype: INT
    - Python dtype: int
- scale_factor
    - 面部检测期间使用的缩放因子，用于调整检测窗口的大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- min_neighbors
    - 保留检测到的面部所需的最小邻居数。这是面部检测算法的一个参数。
    - Comfy dtype: INT
    - Python dtype: int
- denoise
    - 应用于重建面部特征的去噪水平。它平衡了细节保留和噪声减少。
    - Comfy dtype: FLOAT
    - Python dtype: float
- classifier
    - 用于面部检测的分类器类型。它决定了应用于图像中检测面部的算法和模型。
    - Comfy dtype: STRING
    - Python dtype: str
- sampler_name
    - VAE解码过程中使用的采样器名称。它影响生成样本的随机性和多样性。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - 用于控制VAE解码过程中采样进度的调度器。它影响采样步骤的插值和进度。
    - Comfy dtype: STRING
    - Python dtype: str
- cfg
    - VAE采样过程中的配置参数。它微调采样算法的行为。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - VAE采样过程中的步骤数。它决定了采样的持续时间和彻底性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 具有增强和修正面部特征的输出图像。它是节点处理的结果，代表了面部增强后输入图像的最终状态。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class FaceFixerOpenCV:

    @classmethod
    def INPUT_TYPES(s):
        classifiers = ['animeface', 'combined', 'haarcascade_frontalface_default.xml', 'haarcascade_profileface.xml', 'haarcascade_frontalface_alt.xml', 'haarcascade_frontalface_alt2.xml', 'haarcascade_upperbody.xml', 'haarcascade_fullbody.xml', 'haarcascade_lowerbody.xml', 'haarcascade_frontalcatface.xml', 'hands']
        return {'required': {'image': ('IMAGE',), 'base_model': ('MODEL',), 'vae': ('VAE',), 'positive_cond_base': ('CONDITIONING',), 'negative_cond_base': ('CONDITIONING',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'face_img_resolution': ('INT', {'default': 1024, 'min': 512, 'max': 2048}), 'padding': ('INT', {'default': 32, 'min': 0, 'max': 512}), 'scale_factor': ('FLOAT', {'default': 1.2, 'min': 0.1, 'max': 10.0, 'step': 0.1}), 'min_neighbors': ('INT', {'default': 8, 'min': 1, 'max': 100}), 'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'classifier': (classifiers, {'default': 'combined'}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS, {'default': 'dpmpp_2m_sde'}), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS, {'default': 'karras'}), 'cfg': ('FLOAT', {'default': 7.0, 'min': 0.0, 'max': 1000.0, 'step': 0.1}), 'steps': ('INT', {'default': 30, 'min': 1, 'max': 1000})}}
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
        (x1_min, y1_min, x1_max, y1_max) = (box1[0], box1[1], box1[0] + box1[2], box1[1] + box1[3])
        (x2_min, y2_min, x2_max, y2_max) = (box2[0], box2[1], box2[0] + box2[2], box2[1] + box2[3])
        intersect_x_min = max(x1_min, x2_min)
        intersect_y_min = max(y1_min, y2_min)
        intersect_x_max = min(x1_max, x2_max)
        intersect_y_max = min(y1_max, y2_max)
        intersect_area = max(0, intersect_x_max - intersect_x_min) * max(0, intersect_y_max - intersect_y_min)
        box1_area = (x1_max - x1_min) * (y1_max - y1_min)
        box2_area = (x2_max - x2_min) * (y2_max - y2_min)
        union_area = box1_area + box2_area - intersect_area
        iou = intersect_area / union_area if union_area != 0 else 0
        return iou

    def detect_faces(self, image, classifier, scale_factor, min_neighbors):
        try:
            import cv2
        except ImportError:
            raise Exception('OpenCV is not installed. Please install it using "pip install opencv-python"')
        if classifier == 'animeface':
            p = os.path.dirname(os.path.realpath(__file__))
            p = os.path.join(p, 'haar_cascade_models/animeface.xml')
        elif classifier == 'hands':
            p = os.path.dirname(os.path.realpath(__file__))
            p = os.path.join(p, 'haar_cascade_models/hand_gesture.xml')
        else:
            p = cv2.data.haarcascades + classifier
        face_cascade = cv2.CascadeClassifier(p)
        image_np = np.clip(255.0 * image.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
        gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=scale_factor, minNeighbors=min_neighbors, minSize=(32, 32))
        return faces

    def combo_detection(self, image, scale_factor, min_neighbors):
        front_faces = self.detect_faces(image, 'haarcascade_frontalface_default.xml', scale_factor, min_neighbors)
        profile_faces = self.detect_faces(image, 'haarcascade_profileface.xml', scale_factor, min_neighbors)
        anime_faces = self.detect_faces(image, 'animeface', scale_factor, min_neighbors)
        if front_faces == () and profile_faces == () and (anime_faces == ()):
            return front_faces
        if front_faces == () and profile_faces != () and (anime_faces == ()):
            return profile_faces
        if front_faces != () and profile_faces == () and (anime_faces == ()):
            return front_faces
        if front_faces == () and profile_faces == () and (anime_faces != ()):
            return anime_faces
        arrays = []
        if front_faces != ():
            arrays.append(front_faces)
        if profile_faces != ():
            arrays.append(profile_faces)
        if anime_faces != ():
            arrays.append(anime_faces)
        combined_faces = np.concatenate(arrays, axis=0)
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

    def run(self, image, base_model, vae, positive_cond_base, negative_cond_base, seed, face_img_resolution=768, padding=8, scale_factor=1.2, min_neighbors=6, denoise=0.25, classifier='haarcascade_frontalface_default.xml', sampler_name='dpmpp_3m_sde_gpu', scheduler='exponential', cfg=7.0, steps=30):
        image_scaler = ImageScale()
        vaeencoder = VAEEncode()
        vaedecoder = VAEDecode()
        if classifier == 'combined':
            faces = self.combo_detection(image, scale_factor, min_neighbors)
        else:
            faces = self.detect_faces(image, classifier, scale_factor, min_neighbors)
        if faces == ():
            return (image,)
        result = image.clone()
        for (x, y, w, h) in faces:
            x -= padding
            y -= padding
            w += padding * 2
            h += padding * 2
            x = max(0, x)
            y = max(0, y)
            w = min(w, image.shape[2] - x)
            h = min(h, image.shape[1] - y)
            og_crop = image[:, y:y + h, x:x + w]
            (org_width, org_height) = (og_crop.shape[2], og_crop.shape[1])
            crop = image_scaler.upscale(og_crop, 'lanczos', face_img_resolution, face_img_resolution, 'center')[0]
            samples = vaeencoder.encode(vae, crop)[0]
            samples = common_ksampler(base_model, seed, steps, cfg, sampler_name, scheduler, positive_cond_base, negative_cond_base, samples, start_step=int((1 - steps * denoise) // 1), last_step=steps, force_full_denoise=False)[0]
            crop = vaedecoder.decode(vae, samples)[0]
            crop = image_scaler.upscale(crop, 'lanczos', org_width, org_height, 'center')[0]
            feather = crop.shape[2] // 8
            mask = torch.ones(1, crop.shape[1], crop.shape[2], crop.shape[3])
            for t in range(feather):
                mask[:, t:t + 1, :] *= 1.0 / feather * (t + 1)
            for t in range(feather):
                mask[:, :, t:t + 1] *= 1.0 / feather * (t + 1)
            for t in range(feather):
                right_edge_start = crop.shape[2] - feather + t
                mask[:, :, right_edge_start:right_edge_start + 1] *= 1.0 - 1.0 / feather * (t + 1)
            for t in range(feather):
                bottom_edge_start = crop.shape[1] - feather + t
                mask[:, bottom_edge_start:bottom_edge_start + 1, :] *= 1.0 - 1.0 / feather * (t + 1)
            crop = crop * mask
            original_area = result[:, y:y + h, x:x + w]
            inverse_mask = 1 - mask
            original_area = original_area * inverse_mask
            blended_face = original_area + crop
            result[:, y:y + h, x:x + w] = blended_face
        return (result,)
```