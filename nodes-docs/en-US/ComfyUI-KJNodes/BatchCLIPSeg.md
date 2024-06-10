---
tags:
- Segmentation
---

# BatchCLIPSeg
## Documentation
- Class name: `BatchCLIPSeg`
- Category: `KJNodes/masking`
- Output node: `False`

This node segments an image or a batch of images using the CLIPSeg model, leveraging natural language descriptions to guide the segmentation process. It is designed to work with images and textual descriptions to produce segmented masks, optionally applying thresholding and mask manipulation techniques.
## Input types
### Required
- **`images`**
    - The images to be segmented. This input is crucial as it provides the visual data for the segmentation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`text`**
    - A textual description guiding the segmentation process. This description is used to align the segmentation with the user's intent.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`threshold`**
    - A value to determine the sensitivity of the segmentation. Adjusting this threshold affects the segmentation's granularity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`binary_mask`**
    - Determines whether the output mask should be binary. This affects the mask's representation, simplifying it to binary form if true.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`combine_mask`**
    - Controls whether to combine masks for multiple objects into a single mask. This affects the output by potentially merging multiple segmented areas.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`use_cuda`**
    - Indicates whether to use CUDA for processing. This can significantly speed up the segmentation process on compatible hardware.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`Mask`**
    - Comfy dtype: `MASK`
    - The segmented mask(s) produced by the node. These masks correspond to the areas of interest as defined by the input images and textual descriptions.
    - Python dtype: `torch.Tensor`
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
