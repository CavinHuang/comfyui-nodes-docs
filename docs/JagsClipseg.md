# Documentation
- Class name: JagsCLIPSeg
- Category: Jags_vector/CLIPSEG
- Output node: False
- Repo Ref: https://github.com/jags111/ComfyUI_Jags_VectorMagic

JagsCLIPSeg是一个旨在使用文本提示和图像输入执行图像分割的节点。它利用CLIPSeg模型的力量，根据提供的文本描述生成与之对应的详细掩码，增强了分割过程，并利用语言的上下文。

# Input types
## Required
- image
    - 图像参数对于分割过程至关重要，因为它提供了节点将根据提供的文本提示进行分析和分割的视觉上下文。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- text
    - 文本参数作为分割过程的指导提示，描述了节点应在图像中关注的内容或特征。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- blur
    - 模糊参数影响分割掩模的平滑度，较高的值导致更泛化的掩模，较低的值则保留更多细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- threshold
    - 阈值参数决定了分割掩模二值化的截止点，高于阈值的值被保留，低于阈值的被丢弃，影响最终掩模的外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dilation_factor
    - 膨胀因子参数控制分割掩模的扩展，较高的值导致更积极的膨胀，较低的值则导致更保守的扩展。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- Mask
    - 掩模输出是分割的二值表示，其中文本提示描述的元素被突出显示，提供了分割特征的清晰视觉分离。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- Heatmap Mask
    - 热图掩模输出提供了一个视觉渐变，代表了分割的置信度水平，较高的值指示关于分割的确定性更大的区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- BW Mask
    - 黑白掩模输出是掩模的黑白版本，为分割结果提供了直接的视觉表示，适合进一步分析或处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class JagsCLIPSeg:

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
        return {'required': {'image': ('IMAGE',), 'text': ('STRING', {'multiline': False})}, 'optional': {'blur': ('FLOAT', {'min': 0, 'max': 15, 'step': 0.1, 'default': 7}), 'threshold': ('FLOAT', {'min': 0, 'max': 1, 'step': 0.05, 'default': 0.4}), 'dilation_factor': ('INT', {'min': 0, 'max': 10, 'step': 1, 'default': 4})}}
    CATEGORY = 'Jags_vector/CLIPSEG'
    RETURN_TYPES = ('MASK', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('Mask', 'Heatmap Mask', 'BW Mask')
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
        tensor_bw = binary_mask_image.convert('RGB')
        tensor_bw = np.array(tensor_bw).astype(np.float32) / 255.0
        tensor_bw = torch.from_numpy(tensor_bw)[None,]
        tensor_bw = tensor_bw.squeeze(0)[..., 0]
        return (tensor_bw, image_out_heatmap, image_out_binary)
```