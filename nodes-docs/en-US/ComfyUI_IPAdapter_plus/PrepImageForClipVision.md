---
tags:
- CLIP
- Loader
- ModelIO
---

# Prep Image For ClipVision
## Documentation
- Class name: `PrepImageForClipVision`
- Category: `ipadapter/utils`
- Output node: `False`

The node PrepImageForClipVision is designed to prepare images for processing by CLIP vision models, adapting them to the specific input requirements of these models for enhanced image understanding and analysis.
## Input types
### Required
- **`image`**
    - The initial image to be processed, serving as the raw input for feature extraction and encoding.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`interpolation`**
    - The method used for resizing the image, affecting the quality and the way pixels are interpolated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`crop_position`**
    - Specifies the position from which the image is cropped, influencing the focus area of the processed image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sharpening`**
    - Determines the level of sharpness applied to the image, enhancing edge definition and detail visibility.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image, optimized for compatibility with CLIP vision models, ready for further analysis or encoding.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - IDGenerationNode
    - IPAdapterApply
    - [AIO_Preprocessor](../../comfyui_controlnet_aux/Nodes/AIO_Preprocessor.md)
    - [ImageBatch](../../Comfy/Nodes/ImageBatch.md)
    - [CLIPVisionEncode](../../Comfy/Nodes/CLIPVisionEncode.md)
    - PrepImageForInsightFace
    - SetNode
    - IPAdapterApplyFaceID
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [IPAdapterEncoder](../../ComfyUI_IPAdapter_plus/Nodes/IPAdapterEncoder.md)



## Source code
```python
class PrepImageForClipVision:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image": ("IMAGE",),
            "interpolation": (["LANCZOS", "BICUBIC", "HAMMING", "BILINEAR", "BOX", "NEAREST"],),
            "crop_position": (["top", "bottom", "left", "right", "center", "pad"],),
            "sharpening": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "prep_image"

    CATEGORY = "ipadapter/utils"

    def prep_image(self, image, interpolation="LANCZOS", crop_position="center", sharpening=0.0):
        size = (224, 224)
        _, oh, ow, _ = image.shape
        output = image.permute([0,3,1,2])

        if crop_position == "pad":
            if oh != ow:
                if oh > ow:
                    pad = (oh - ow) // 2
                    pad = (pad, 0, pad, 0)
                elif ow > oh:
                    pad = (ow - oh) // 2
                    pad = (0, pad, 0, pad)
                output = T.functional.pad(output, pad, fill=0)
        else:
            crop_size = min(oh, ow)
            x = (ow-crop_size) // 2
            y = (oh-crop_size) // 2
            if "top" in crop_position:
                y = 0
            elif "bottom" in crop_position:
                y = oh-crop_size
            elif "left" in crop_position:
                x = 0
            elif "right" in crop_position:
                x = ow-crop_size

            x2 = x+crop_size
            y2 = y+crop_size

            output = output[:, :, y:y2, x:x2]

        imgs = []
        for img in output:
            img = T.ToPILImage()(img) # using PIL for better results
            img = img.resize(size, resample=Image.Resampling[interpolation])
            imgs.append(T.ToTensor()(img))
        output = torch.stack(imgs, dim=0)
        del imgs, img

        if sharpening > 0:
            output = contrast_adaptive_sharpening(output, sharpening)

        output = output.permute([0,2,3,1])

        return (output, )

```
