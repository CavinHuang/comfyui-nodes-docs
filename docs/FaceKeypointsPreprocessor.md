# Documentation
- Class name: FaceKeypointsPreprocessor
- Category: InstantID
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_InstantID.git

FaceKeypointsPreprocessor节点旨在通过预处理图像来提取和利用面部关键点，从而增强面部识别任务。该节点利用先进的面部分析技术来识别和处理面部特征，这对于提高后续面部识别模型的准确性和效率至关重要。通过专注于提取关键的面部点，该节点有助于更细致地理解面部结构，从而促进更有效的面部分析。

# Input types
## Required
- faceanalysis
    - faceanalysis参数是必需的，因为它提供了图像预处理所需的面部分析模型及其相关特征。它在检测和提取面部关键点中发挥关键作用，直接影响预处理的有效性。
    - Comfy dtype: FACEANALYSIS
    - Python dtype: InsightFaceModel
- image
    - image参数是FaceKeypointsPreprocessor处理的输入图像。它是节点操作的基础，是提取面部关键点的来源。图像的质量和分辨率直接影响面部特征检测的准确性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Output types
- face_kps
    - FaceKeypointsPreprocessor的输出，face_kps，是从输入图像中提取的面部关键点的表示。这些关键点非常重要，因为它们为后续的面部识别和分析任务提供了基础，使得面部特征的识别和理解更加精确。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class FaceKeypointsPreprocessor:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'faceanalysis': ('FACEANALYSIS',), 'image': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'preprocess_image'
    CATEGORY = 'InstantID'

    def preprocess_image(self, faceanalysis, image):
        face_kps = extractFeatures(faceanalysis, image, extract_kps=True)
        if face_kps is None:
            face_kps = torch.zeros_like(image)
            print(f'\x1b[33mWARNING: no face detected, unable to extract the keypoints!\x1b[0m')
        return (face_kps,)
```