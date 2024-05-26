# Documentation
- Class name: FaceBBoxDetect
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

FaceBBoxDetect节点旨在使用预训练的边界框检测器识别和定位图像中的面部。它处理输入图像以检测面部，并对边界框进行调整，以确保它们在图像边界内，从而提供经过提炼的面部边界框列表。

# Input types
## Required
- bbox_detector
    - bbox_detector参数是用于检测输入图像中面部边界框的预训练模型。它对节点的功能至关重要，因为它直接影响面部检测过程的准确性和可靠性。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: YOLO
- image
    - image参数表示将执行面部检测操作的输入图像数据。它至关重要，因为它是节点识别面部的主要信息来源。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- threshold
    - threshold参数用于设置面部检测的置信度水平。它影响节点是否将检测到的面部包含在最终结果中的决定，从而影响检测的精度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dilation
    - dilation参数用于调整检测到的边界框的大小。它很重要，因为它可以帮助微调边界框坐标的准确性，以更好地适应面部的实际大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- bbox_list
    - bbox_list输出包含检测到的面部周围的精炼边界框列表。它很重要，因为它代表了面部检测过程的直接结果，为进一步分析或处理提供了有价值的数据。
    - Comfy dtype: BBOX_LIST
    - Python dtype: List[Tuple[int, int, int, int]]

# Usage tips
- Infra type: CPU

# Source code
```
class FaceBBoxDetect:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'bbox_detector': ('BBOX_DETECTOR', {}), 'image': ('IMAGE', {}), 'threshold': ('FLOAT', {'default': 0.3, 'min': 0, 'max': 1, 'step': 0.01}), 'dilation': ('INT', {'default': 8, 'min': -512, 'max': 512, 'step': 1})}}
    RETURN_TYPES = ('BBOX_LIST',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, bbox_detector: YOLO, image: Tensor, threshold: float, dilation: int):
        results = []
        transform = T.ToPILImage()
        for item in image:
            image_pil = transform(item.permute(2, 0, 1))
            pred = bbox_detector(image_pil, conf=threshold)
            bboxes = pred[0].boxes.xyxy.cpu()
            for bbox in bboxes:
                bbox[0] = bbox[0] - dilation
                bbox[1] = bbox[1] - dilation
                bbox[2] = bbox[2] + dilation
                bbox[3] = bbox[3] + dilation
                bbox[0] = bbox[0] if bbox[0] > 0 else 0
                bbox[1] = bbox[1] if bbox[1] > 0 else 0
                bbox[2] = bbox[2] if bbox[2] < item.shape[1] else item.shape[1]
                bbox[3] = bbox[3] if bbox[3] < item.shape[0] else item.shape[0]
                results.append(bbox)
        return (results,)
```