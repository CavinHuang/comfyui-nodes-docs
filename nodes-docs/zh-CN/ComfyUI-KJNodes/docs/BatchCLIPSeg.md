
# Documentation
- Class name: BatchCLIPSeg
- Category: KJNodes/masking
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

BatchCLIPSeg节点利用CLIPSeg模型对单张图像或批量图像进行分割。它通过自然语言描述来引导分割过程，将图像和文本描述结合起来生成分割掩码。该节点还可以选择性地应用阈值处理和掩码操作技术。

# Input types
## Required
- images
    - 需要进行分割的图像。这是分割过程的核心输入，提供了视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- text
    - 用于指导分割过程的文本描述。该描述用于将分割结果与用户意图对齐。
    - Comfy dtype: STRING
    - Python dtype: str
- threshold
    - 用于确定分割敏感度的阈值。调整这个阈值会影响分割的精细程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- binary_mask
    - 决定输出的掩码是否为二值化。如果为真，则会将掩码简化为二值形式。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- combine_mask
    - 控制是否将多个对象的掩码合并为单个掩码。这会影响输出，可能会合并多个分割区域。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- use_cuda
    - 指示是否使用CUDA进行处理。在兼容的硬件上，这可以显著加快分割过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- Mask
    - 节点生成的分割掩码。这些掩码对应于由输入图像和文本描述定义的感兴趣区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchCLIPSeg:

    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
       
        return {"required":
                    {
                        "images": ("IMAGE",),
                        "text": ("STRING", {"multiline": False}),
                        "threshold": ("FLOAT", {"default": 0.1,"min": 0.0, "max": 10.0, "step": 0.001}),
                        "binary_mask": ("BOOLEAN", {"default": True}),
                        "combine_mask": ("BOOLEAN", {"default": False}),
                        "use_cuda": ("BOOLEAN", {"default": True}),
                     },
                }

    CATEGORY = "KJNodes/masking"
    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("Mask",)
    FUNCTION = "segment_image"
    DESCRIPTION = """
Segments an image or batch of images using CLIPSeg.
"""

    def segment_image(self, images, text, threshold, binary_mask, combine_mask, use_cuda):        
        from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation
        out = []
        height, width, _ = images[0].shape
        if use_cuda and torch.cuda.is_available():
            device = torch.device("cuda")
        else:
            device = torch.device("cpu")
        dtype = comfy.model_management.unet_dtype()
        model = CLIPSegForImageSegmentation.from_pretrained("CIDAS/clipseg-rd64-refined")
        model.to(dtype)
        model.to(device)
        images = images.to(device)
        processor = CLIPSegProcessor.from_pretrained("CIDAS/clipseg-rd64-refined")
        pbar = comfy.utils.ProgressBar(images.shape[0])
        autocast_condition = (dtype != torch.float32) and not comfy.model_management.is_device_mps(device)
        with torch.autocast(comfy.model_management.get_autocast_device(device), dtype=dtype) if autocast_condition else nullcontext():
            for image in images:
                image = (image* 255).type(torch.uint8)
                prompt = text
                input_prc = processor(text=prompt, images=image, return_tensors="pt")
                # Move the processed input to the device
                for key in input_prc:
                    input_prc[key] = input_prc[key].to(device)
                
                outputs = model(**input_prc)
    
                tensor = torch.sigmoid(outputs[0])
                tensor_thresholded = torch.where(tensor > threshold, tensor, torch.tensor(0, dtype=torch.float))
                tensor_normalized = (tensor_thresholded - tensor_thresholded.min()) / (tensor_thresholded.max() - tensor_thresholded.min())
                tensor = tensor_normalized

                # Resize the mask
                if len(tensor.shape) == 3:
                    tensor = tensor.unsqueeze(0)
                resized_tensor = F.interpolate(tensor, size=(height, width), mode='nearest')

                # Remove the extra dimensions
                resized_tensor = resized_tensor[0, 0, :, :]
                pbar.update(1)
                out.append(resized_tensor)
          
        results = torch.stack(out).cpu().float()
        
        if combine_mask:
            combined_results = torch.max(results, dim=0)[0]
            results = combined_results.unsqueeze(0).repeat(len(images),1,1)

        if binary_mask:
            results = results.round()
        
        return results,

```
