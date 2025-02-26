# Documentation  
- Class name: BiRefNet_Remove_Background  
- Category: BiRefNet🌟  
- Output node: False 
- Repo Ref: https://github.com/moon7star9/ComfyUI_BiRefNet_Universal

BiRefNet_Remove_Background节点是一个用于图像背景移除的处理节点。它接收已加载的BiRefNet模型和输入图像，通过深度学习方法准确分割前景和背景，并可以选择性地对前景进行优化处理。节点支持多种背景处理选项，包括透明背景和各种纯色背景，同时提供前景优化功能以提高边缘质量。  

# Input types  
## Required  
- model  
    - 'model'参数接收从BiRefNet_Loader节点输出的模型实例，包含了预训练模型及其配置信息。  
    - Comfy dtype: BIREFNET_MODEL  
    - Python dtype: dict  
- image  
    - 'image'参数是需要处理的输入图像。节点会自动调整图像大小以匹配模型的最佳工作分辨率。  
    - Comfy dtype: IMAGE  
    - Python dtype: torch.Tensor  
- background_color  
    - 'background_color'参数允许用户选择输出图像的背景类型，可以是透明背景或指定的纯色背景（白色、黑色、绿色、蓝色、红色）。  
    - Comfy dtype: COMBO  
    - Python dtype: str  
- use_refine  
    - 'use_refine'参数控制是否使用前景优化功能。启用此选项可以改善边缘质量，但可能会略微增加处理时间。  
    - Comfy dtype: BOOLEAN  
    - Python dtype: bool  

# Output types  
- IMAGE  
    - 输出处理后的图像，根据选择的背景类型可能是RGBA（透明背景）或RGB（纯色背景）格式。  
    - Comfy dtype: IMAGE  
    - Python dtype: torch.Tensor  
- MASK  
    - 输出分割掩码，表示前景区域的二值图像。这个掩码可以用于其他节点的进一步处理。  
    - Comfy dtype: MASK  
    - Python dtype: torch.Tensor  

# Usage tips  
- Infra type: GPU/CPU  
- 推荐在GPU上运行以获得更好的性能  
- 使用透明背景选项时，输出将是RGBA格式  
- 启用前景优化可以改善边缘质量，特别是对于复杂的边缘细节  
- 输出的掩码可以用于其他图像处理节点的遮罩输入  

# Source code  
```python  
class BiRefNet_Remove_Background:  
    @classmethod  
    def INPUT_TYPES(cls):  
        return {  
            "required": {  
                "model": ("BIREFNET_MODEL",),  
                "image": ("IMAGE",),  
                "background_color": (["transparency"] + ["white", "black", "green", "blue", "red"], {"default": "transparency"}),
                "use_refine": ("BOOLEAN", {"default": True})  
            }  
        }  

    RETURN_TYPES = ("IMAGE", "MASK")  
    RETURN_NAMES = ("image", "mask")  
    FUNCTION = "inference"  
    CATEGORY = "BiRefNet🌟"  

    def inference(self, image, model, background_color, use_refine):  
        model_data = model  
        model = model_data["model"]  
        device = model_data["device"]  
        use_half_precision = model_data["half_precision"]  
        resolution = model_data["resolution"]  # 直接使用模型的最佳分辨率  

        preprocessor = ImagePreprocessor(resolution)  
        processed_images = []  
        processed_masks = []  

        for img in image:  
            # 转换为PIL图像  
            orig_image = Image.fromarray(np.clip(255. * img.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))  
            w, h = orig_image.size  
            
            # 预处理  
            image_tensor = preprocessor(orig_image.convert('RGB')).unsqueeze(0)  
            if use_half_precision:  
                image_tensor = image_tensor.half()  
            image_tensor = image_tensor.to(device)  

            # 推理  
            with torch.no_grad():  
                preds = model(image_tensor)[-1].sigmoid().cpu()  

            pred = preds[0].squeeze()
            pred_pil = transforms.ToPILImage()(pred)
            mask = pred_pil.resize((w, h))
            

            # 选择应用前景优化  
            if use_refine:  
                refined_image = refine_foreground(orig_image, pred_pil, r=90)  # 使用固定的r值即可（实验验证过调整r值对结果影响很小） 

            # 设置背景和前景  

            if background_color == "transparency":  
                result_image = Image.new("RGBA", (w, h), (0, 0, 0, 0))  
                result_image.paste(refined_image if use_refine else orig_image, mask=mask)
            else:  
                result_image = Image.new("RGB", (w, h), background_color)  
                result_image.paste(refined_image if use_refine else orig_image, mask=mask)
            
            # 转换回tensor  
            processed_images.append(torch.from_numpy(np.array(result_image).astype(np.float32) / 255.0).unsqueeze(0)) 
            processed_masks.append(torch.from_numpy(np.array(mask).astype(np.float32) / 255.0).unsqueeze(0))  

        return torch.cat(processed_images, dim=0), torch.cat(processed_masks, dim=0)  