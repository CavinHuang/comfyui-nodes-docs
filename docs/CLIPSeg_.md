# Documentation
- Class name: CLIPSeg
- Category: ♾️Mixlab/Mask
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-CLIPSeg

CLIPSeg节点旨在使用文本提示和图像输入执行图像分割。它利用CLIPSeg模型的力量创建与所提供的文本描述一致的分割掩码。该节点擅长生成可以进一步处理以用于各种应用的掩码，例如对象识别、图像编辑和数据分析。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是分割的主要输入。它决定了将根据提供的文本提示进行分析和分割的内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- text
    - 文本参数是必需的，因为它提供了指导分割过程的描述性提示。它使节点能够专注于图像中与文本描述相关的特定元素。
    - Comfy dtype: STRING
    - Python dtype: str
- blur
    - 模糊参数允许调整分割掩码的平滑度。它有助于细化掩码的边缘并提高分割的整体质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- threshold
    - 阈值参数用于将连续的分割掩码转换为二进制掩码。它决定了分割中对象和背景之间的截止点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dilation_factor
    - 膨胀因子对于扩展分割掩码的边界很重要。它可以用来确保分割区域覆盖目标对象的全部。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- Mask
    - 掩码输出提供了图像分割过程产生的二进制分割掩码。对于需要对象识别或与背景分离的应用来说，这是一个关键的输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- Heatmap Mask
    - 热图掩码输出是分割掩码的视觉表示，其中颜色的强度对应于分割的置信度水平。它适用于视觉分析和调试目的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- BW Mask
    - 黑白掩码输出是分割掩码的二值化版本，为分割的对象和背景提供了直接的区分。它通常用于进一步处理或作为分割的简化表示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class CLIPSeg:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        """
            Return a dictionary which contains config for all input fields.
            Some types (string): "MODEL", "VAE", "CLIP", "CONDITIONING", "LATENT", "IMAGE", "INT", "STRING", "FLOAT".
            Input types "INT", "STRING" or "FLOAT" are special values for fields on the node.
            The type can be a list for selection.

            Returns: `dict`:
                - Key input_fields_group (`string`): Can be either required, hidden or optional. A node class must have property `required`
                - Value input_fields (`dict`): Contains input fields config:
                    * Key field_name (`string`): Name of a entry-point method's argument
                    * Value field_config (`tuple`):
                        + First value is a string indicate the type of field or a list for selection.
                        + Secound value is a config for type "INT", "STRING" or "FLOAT".
        """
        return {'required': {'image': ('IMAGE',), 'text': ('STRING', {'multiline': False, 'dynamicPrompts': False})}, 'optional': {'blur': ('FLOAT', {'min': 0, 'max': 15, 'step': 0.1, 'default': 3}), 'threshold': ('FLOAT', {'min': 0, 'max': 1, 'step': 0.05, 'default': 0.3}), 'dilation_factor': ('INT', {'min': 0, 'max': 10, 'step': 1, 'default': 4})}}
    CATEGORY = '♾️Mixlab/Mask'
    RETURN_TYPES = ('MASK', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('Mask', 'Heatmap Mask', 'BW Mask')
    OUTPUT_IS_LIST = (False, False, False)
    FUNCTION = 'segment_image'

    def segment_image(self, image: torch.Tensor, text: str, blur: float, threshold: float, dilation_factor: int) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        """Create a segmentation mask from an image and a text prompt using CLIPSeg.

        Args:
            image (torch.Tensor): The image to segment.
            text (str): The text prompt to use for segmentation.
            blur (float): How much to blur the segmentation mask.
            threshold (float): The threshold to use for binarizing the segmentation mask.
            dilation_factor (int): How much to dilate the segmentation mask.

        Returns:
            Tuple[torch.Tensor, torch.Tensor, torch.Tensor]: The segmentation mask, the heatmap mask, and the binarized mask.
        """
        image_np = image.numpy().squeeze()
        image_np = (image_np * 255).astype(np.uint8)
        i = Image.fromarray(image_np, mode='RGB')
        processor = CLIPSegProcessor.from_pretrained(clipseg_model_dir)
        model = CLIPSegForImageSegmentation.from_pretrained(clipseg_model_dir)
        prompt = text
        input_prc = processor(text=prompt, images=i, padding='max_length', return_tensors='pt')
        with torch.no_grad():
            outputs = model(**input_prc)
        tensor = torch.sigmoid(outputs[0])
        thresh = threshold
        tensor_thresholded = torch.where(tensor > thresh, tensor, torch.tensor(0, dtype=torch.float))
        sigma = blur
        tensor_smoothed = gaussian_filter(tensor_thresholded.numpy(), sigma=sigma)
        tensor_smoothed = torch.from_numpy(tensor_smoothed)
        mask_normalized = (tensor_smoothed - tensor_smoothed.min()) / (tensor_smoothed.max() - tensor_smoothed.min())
        mask_dilated = dilate_mask(mask_normalized, dilation_factor)
        heatmap = apply_colormap(mask_dilated, cm.viridis)
        binary_mask = apply_colormap(mask_dilated, cm.Greys_r)
        dimensions = (image_np.shape[1], image_np.shape[0])
        heatmap_resized = resize_image(heatmap, dimensions)
        binary_mask_resized = resize_image(binary_mask, dimensions)
        (alpha_heatmap, alpha_binary) = (0.5, 1)
        overlay_heatmap = overlay_image(image_np, heatmap_resized, alpha_heatmap)
        overlay_binary = overlay_image(image_np, binary_mask_resized, alpha_binary)
        image_out_heatmap = numpy_to_tensor(overlay_heatmap)
        image_out_binary = numpy_to_tensor(overlay_binary)
        binary_mask_image = Image.fromarray(binary_mask_resized[..., 0])
        tensor_bw = binary_mask_image.convert('L')
        tensor_bw = pil2tensor(tensor_bw)
        return (tensor_bw, image_out_heatmap, image_out_binary)
```