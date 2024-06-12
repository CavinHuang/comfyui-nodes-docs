---
tags:
- Color
---

# ColorMatch
## Documentation
- Class name: `ColorMatch`
- Category: `KJNodes/image`
- Output node: `False`

The ColorMatch node is designed for transferring color schemes between images, utilizing various color matching techniques. It supports multiple color transfer methods, including MKL and histogram matching, to adapt the color palette of a target image to match that of a reference image.
## Input types
### Required
- **`image_ref`**
    - The reference image whose color palette is to be transferred. It plays a crucial role in determining the final appearance of the target image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_target`**
    - The target image that will receive the color palette of the reference image. This image is transformed to match the color scheme of the reference image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`method`**
    - Specifies the color transfer method to be used, such as MKL or histogram matching, affecting the style of color adaptation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after color transfer, with its colors adapted to match the reference image's palette.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImageBatch](../../Comfy/Nodes/ImageBatch.md)
    - [VHS_SplitImages](../../ComfyUI-VideoHelperSuite/Nodes/VHS_SplitImages.md)



## Source code
```python
class ColorMatch:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image_ref": ("IMAGE",),
                "image_target": ("IMAGE",),
                "method": (
            [   
                'mkl',
                'hm', 
                'reinhard', 
                'mvgd', 
                'hm-mvgd-hm', 
                'hm-mkl-hm',
            ], {
               "default": 'mkl'
            }),
                
            },
        }
    
    CATEGORY = "KJNodes/image"

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "colormatch"
    DESCRIPTION = """
color-matcher enables color transfer across images which comes in handy for automatic  
color-grading of photographs, paintings and film sequences as well as light-field  
and stopmotion corrections.  

The methods behind the mappings are based on the approach from Reinhard et al.,  
the Monge-Kantorovich Linearization (MKL) as proposed by Pitie et al. and our analytical solution  
to a Multi-Variate Gaussian Distribution (MVGD) transfer in conjunction with classical histogram   
matching. As shown below our HM-MVGD-HM compound outperforms existing methods.   
https://github.com/hahnec/color-matcher/

"""
    
    def colormatch(self, image_ref, image_target, method):
        try:
            from color_matcher import ColorMatcher
        except:
            raise Exception("Can't import color-matcher, did you install requirements.txt? Manual install: pip install color-matcher")
        cm = ColorMatcher()
        image_ref = image_ref.cpu()
        image_target = image_target.cpu()
        batch_size = image_target.size(0)
        out = []
        images_target = image_target.squeeze()
        images_ref = image_ref.squeeze()

        image_ref_np = images_ref.numpy()
        images_target_np = images_target.numpy()

        if image_ref.size(0) > 1 and image_ref.size(0) != batch_size:
            raise ValueError("ColorMatch: Use either single reference image or a matching batch of reference images.")

        for i in range(batch_size):
            image_target_np = images_target_np if batch_size == 1 else images_target[i].numpy()
            image_ref_np_i = image_ref_np if image_ref.size(0) == 1 else images_ref[i].numpy()
            try:
                image_result = cm.transfer(src=image_target_np, ref=image_ref_np_i, method=method)
            except BaseException as e:
                print(f"Error occurred during transfer: {e}")
                break
            out.append(torch.from_numpy(image_result))
        return (torch.stack(out, dim=0).to(torch.float32), )

```
