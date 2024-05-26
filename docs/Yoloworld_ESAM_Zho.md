# Documentation
- Class name: Yoloworld_ESAM_Zho
- Category: YOLOWORLD_ESAM
- Output node: False
- Repo Ref: https://github.com/ZHO-ZHO-ZHO/ComfyUI-YoloWorld-EfficientSAM.git

Yoloworld_ESAM_Zho类封装了将YOLO目标检测与ESAM分割集成的功能。它的目的是通过对图像中的对象进行识别和分类，以及基于检测到的类别进行分割，从而对图像进行全面分析。该节点通过增强对视觉内容的理解，对整体流程做出贡献，这对于需要详细分析图像的应用程序至关重要。

# Input types
## Required
- yolo_world_model
    - YOLO世界模型对于目标检测过程至关重要。它负责识别和分类输入图像中的对象。模型的准确性和效率直接影响节点处理图像和产生准确结果的能力。
    - Comfy dtype: YOLOWORLDMODEL
    - Python dtype: YOLOWorldModel
- esam_model
    - ESAM模型对分割过程至关重要。它接受检测到的对象，并进一步细化对它们在图像中空间分布的理解。模型的性能对于实现详细和精确的分割掩膜至关重要。
    - Comfy dtype: ESAMMODEL
    - Python dtype: ESAMModel
- image
    - 图像是节点的主要输入。它们是检测和分割过程的对象。图像的质量和分辨率直接影响结果的准确性和可靠性。
    - Comfy dtype: IMAGE
    - Python dtype: List[cv2.ndarray]
- categories
    - 类别定义了模型将在图像中识别的类别。它们对于指导检测和分割过程至关重要，确保节点专注于相关对象。
    - Comfy dtype: STRING
    - Python dtype: List[str]
## Optional
- confidence_threshold
    - 置信度阈值过滤掉未达到一定置信水平的检测结果。它在管理检测灵敏度和特异性之间的权衡中起着重要作用，从而影响结果的整体质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- iou_threshold
    - 交并比(IoU)阈值在非极大值抑制(NMS)过程中使用，用于消除冗余的检测。它通过减少重叠区域，影响节点产生干净准确检测集的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- box_thickness
    - 边框厚度决定了绘制在检测对象周围的边界框的视觉突出程度。它影响注释图像的美观和清晰度，这对于视觉分析和解释很重要。
    - Comfy dtype: INT
    - Python dtype: int
- text_thickness
    - 文本厚度影响注释图像上绘制的类别标签的可见性。它对于确保标签易于阅读并有助于全面理解图像内容很重要。
    - Comfy dtype: INT
    - Python dtype: int
- text_scale
    - 文本缩放调整类别标签的大小，影响注释图像的可读性和视觉平衡。它是创建既信息丰富又视觉上吸引人的注释的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- with_confidence
    - 启用此参数后，会在类别标签旁添加置信度分数，提供关于检测结果可靠性的额外信息层。这对于依赖检测结果确定性的决策过程至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- with_class_agnostic_nms
    - 激活此参数后，将对检测结果应用类别不可知的非极大值抑制(NMS)，有助于减少不同类别之间的重叠框。它通过确保边界框集更清洁、更有组织来改善检测结果的整体呈现。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- with_segmentation
    - 启用此参数后，节点将对检测到的对象进行分割，提供其形状和边界的详细视觉表示。这增强了对图像内容的理解，对于需要精确对象勾画的应用特别有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- mask_combined
    - 此参数控制是否将分割掩膜合并成一个表示所有检测到的对象的单个掩膜。这对于可视化图像中对象的集体空间分布很有帮助。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- mask_extracted
    - 启用此参数后，允许提取每个检测到的对象的单独分割掩膜，为单独操作或分析各个对象提供了精细控制，这对于需要单独处理或分析各个对象的应用程序特别有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- mask_extracted_index
    - 此参数指定在需要单独掩膜时提取的分割掩膜的索引。它对于在检测到的对象集中定位特定对象以进行进一步处理或分析至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- processed_images
    - 处理后的图像是在应用目标检测和分割后节点的输出。它们包括边界框和标签等注释，提供了检测和分割对象的视觉表示。这些图像对于视觉分析和验证节点的性能至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- processed_masks
    - 处理后的掩膜是分割输出，它们勾勒出检测到的对象的精确边界。它们对于需要图像中对象的详细空间信息的应用程序非常重要，例如在医学成像或自动驾驶车辆导航中。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class Yoloworld_ESAM_Zho:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'yolo_world_model': ('YOLOWORLDMODEL',), 'esam_model': ('ESAMMODEL',), 'image': ('IMAGE',), 'categories': ('STRING', {'default': 'person, bicycle, car, motorcycle, airplane, bus, train, truck, boat', 'multiline': True}), 'confidence_threshold': ('FLOAT', {'default': 0.1, 'min': 0, 'max': 1, 'step': 0.01}), 'iou_threshold': ('FLOAT', {'default': 0.1, 'min': 0, 'max': 1, 'step': 0.01}), 'box_thickness': ('INT', {'default': 2, 'min': 1, 'max': 5}), 'text_thickness': ('INT', {'default': 2, 'min': 1, 'max': 5}), 'text_scale': ('FLOAT', {'default': 1.0, 'min': 0, 'max': 1, 'step': 0.01}), 'with_confidence': ('BOOLEAN', {'default': True}), 'with_class_agnostic_nms': ('BOOLEAN', {'default': False}), 'with_segmentation': ('BOOLEAN', {'default': True}), 'mask_combined': ('BOOLEAN', {'default': True}), 'mask_extracted': ('BOOLEAN', {'default': True}), 'mask_extracted_index': ('INT', {'default': 0, 'min': 0, 'max': 1000})}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'yoloworld_esam_image'
    CATEGORY = 'YOLOWORLD_ESAM'

    def yoloworld_esam_image(self, image, yolo_world_model, esam_model, categories, confidence_threshold, iou_threshold, box_thickness, text_thickness, text_scale, with_segmentation, mask_combined, with_confidence, with_class_agnostic_nms, mask_extracted, mask_extracted_index):
        categories = process_categories(categories)
        processed_images = []
        processed_masks = []
        for img in image:
            img = np.clip(255.0 * img.cpu().numpy().squeeze(), 0, 255).astype(np.uint8)
            YOLO_WORLD_MODEL = yolo_world_model
            YOLO_WORLD_MODEL.set_classes(categories)
            results = YOLO_WORLD_MODEL.infer(img, confidence=confidence_threshold)
            detections = sv.Detections.from_inference(results)
            detections = detections.with_nms(class_agnostic=with_class_agnostic_nms, threshold=iou_threshold)
            combined_mask = None
            if with_segmentation:
                detections.mask = inference_with_boxes(image=img, xyxy=detections.xyxy, model=esam_model, device=DEVICE)
                if mask_combined:
                    combined_mask = np.zeros(img.shape[:2], dtype=np.uint8)
                    det_mask = detections.mask
                    for mask in det_mask:
                        combined_mask = np.logical_or(combined_mask, mask).astype(np.uint8)
                    masks_tensor = torch.tensor(combined_mask, dtype=torch.float32)
                    processed_masks.append(masks_tensor)
                else:
                    det_mask = detections.mask
                    if mask_extracted:
                        mask_index = mask_extracted_index
                        selected_mask = det_mask[mask_index]
                        masks_tensor = torch.tensor(selected_mask, dtype=torch.float32)
                    else:
                        masks_tensor = torch.tensor(det_mask, dtype=torch.float32)
                    processed_masks.append(masks_tensor)
            output_image = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
            output_image = annotate_image(input_image=output_image, detections=detections, categories=categories, with_confidence=with_confidence, thickness=box_thickness, text_thickness=text_thickness, text_scale=text_scale)
            output_image = cv2.cvtColor(output_image, cv2.COLOR_BGR2RGB)
            output_image = torch.from_numpy(output_image.astype(np.float32) / 255.0).unsqueeze(0)
            processed_images.append(output_image)
        new_ims = torch.cat(processed_images, dim=0)
        if processed_masks:
            new_masks = torch.stack(processed_masks, dim=0)
        else:
            new_masks = torch.empty(0)
        return (new_ims, new_masks)
```