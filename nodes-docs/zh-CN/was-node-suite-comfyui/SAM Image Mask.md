# Documentation
- Class name: WAS_SAM_Image_Mask
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_SAM_Image_Mask 节点的 `sam_image_mask` 方法旨在将语义感知分割模型应用于输入图像，生成相应的掩码。它利用 SAM（Semantic Aware Masking）模型预测分割，然后使用该分割创建原始图像上的掩码覆盖。该方法对于需要识别和隔离图像中特定区域以进行进一步分析或操作的应用至关重要。

# Input types
## Required
- sam_model
    - 参数 `sam_model` 至关重要，因为它表示将用于处理输入图像的语义感知分割模型。这是一个关键组件，决定了生成的掩码的质量和准确性。
    - Comfy dtype: SAM_MODEL
    - Python dtype: torch.nn.Module
- sam_parameters
    - 参数 `sam_parameters` 包含 SAM 模型执行分割所需的点和标签。这是一个关键的输入，它直接影响分割过程的结果。
    - Comfy dtype: SAM_PARAMETERS
    - Python dtype: Dict[str, Any]
- image
    - 参数 `image` 是将由 SAM 模型处理以生成掩码的输入图像。它是节点操作的主要数据源，其格式可以显著影响分割结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出 `image` 是带有预测掩码覆盖的原始输入图像。它代表了语义感知分割过程的视觉结果，允许直接视觉检查掩码区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 输出 `mask` 是分割掩码的二进制表示，突出显示了 SAM 模型识别的区域。它对于需要更精确地操作或分析特定图像区域的应用来说非常重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_SAM_Image_Mask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'sam_model': ('SAM_MODEL',), 'sam_parameters': ('SAM_PARAMETERS',), 'image': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'sam_image_mask'
    CATEGORY = 'WAS Suite/Image/Masking'

    def sam_image_mask(self, sam_model, sam_parameters, image):
        image = tensor2sam(image)
        points = sam_parameters['points']
        labels = sam_parameters['labels']
        from segment_anything import SamPredictor
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        sam_model.to(device=device)
        predictor = SamPredictor(sam_model)
        predictor.set_image(image)
        (masks, scores, logits) = predictor.predict(point_coords=points, point_labels=labels, multimask_output=False)
        sam_model.to(device='cpu')
        mask = np.expand_dims(masks, axis=-1)
        image = np.repeat(mask, 3, axis=-1)
        image = torch.from_numpy(image)
        mask = torch.from_numpy(mask)
        mask = mask.squeeze(2)
        mask = mask.squeeze().to(torch.float32)
        return (image, mask)
```