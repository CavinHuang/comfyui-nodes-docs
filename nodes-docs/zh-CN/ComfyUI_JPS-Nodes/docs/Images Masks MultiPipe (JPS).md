
# Documentation
- Class name: Images Masks MultiPipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Images Masks MultiPipe (JPS)节点旨在简化管道中图像和遮罩的处理和操作流程，支持生成、修改和修复等操作，并可结合模型使用。它是一个多功能组件，适用于需要处理视觉数据及其相关遮罩的工作流程，能够简化图像生成、修改和增强等任务。

# Input types
## Optional
- generation_img
    - 指定用于生成过程的初始图像，为后续的图像处理或增强奠定基础。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- generation_mask
    - 定义与生成图像相关的遮罩，用于指导或限制图像处理管道中的特定操作。
    - Comfy dtype: MASK
    - Python dtype: MASK
- ipa1_img
    - 表示经过第一次中间管道处理后的图像，是多步骤图像处理工作流的一部分。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- ipa2_img
    - 代表第二次中间管道处理后的图像，进一步推进图像处理任务。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- ipa1_mask
    - 作为第一个中间管道处理图像的遮罩，协助进行有针对性的图像修改或增强。
    - Comfy dtype: MASK
    - Python dtype: MASK
- ipa2_mask
    - 充当第二个中间管道处理图像的遮罩，实现对图像变更的精确控制。
    - Comfy dtype: MASK
    - Python dtype: MASK
- revision1_img
    - 表示第一次修订后的图像，展示了在初始生成或处理后应用的修改或改进。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- revision2_img
    - 代表第二次修订后的图像，呈现了在初始修订后进行的进一步调整或细化。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- inpaint_model
    - 引入一个支持修复任务的模型，能够基于提供的遮罩对图像进行修复或完善。
    - Comfy dtype: MODEL
    - Python dtype: MODEL

# Output types
- generation_img
    - 输出经过管道处理后的生成图像。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- generation_mask
    - 输出与生成图像相关的遮罩，反映了所做的任何修改或增强。
    - Comfy dtype: MASK
    - Python dtype: MASK
- ipa1_img
    - 输出经过特定管道操作处理后的第一个中间图像。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- ipa2_img
    - 输出展示进一步处理步骤的第二个中间图像。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- ipa1_mask
    - 输出第一个中间处理图像的遮罩，指示关注或限制区域。
    - Comfy dtype: MASK
    - Python dtype: MASK
- ipa2_mask
    - 输出第二个中间处理图像的遮罩，引导进一步的图像修改。
    - Comfy dtype: MASK
    - Python dtype: MASK
- revision1_img
    - 输出应用修改或增强后的第一个修订图像。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- revision2_img
    - 输出反映额外调整或细化后的第二个修订图像。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE
- inpaint_model
    - 提供用于修复任务的模型，促进图像的修复或完善。
    - Comfy dtype: MODEL
    - Python dtype: MODEL


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Images_Masks_MultiPipe:

    CATEGORY = 'JPS Nodes/Pipes'
    RETURN_TYPES = ("IMAGE","MASK","IMAGE","IMAGE","MASK","MASK","IMAGE","IMAGE","MODEL",)
    RETURN_NAMES = ("generation_img","generation_mask","ipa1_img","ipa2_img","ipa1_mask","ipa2_mask","revision1_img","revision2_img","inpaint_model",)
    FUNCTION = "get_imagemask"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "generation_img": ("IMAGE",),
                "generation_mask": ("MASK",),
                "ipa1_img": ("IMAGE",),
                "ipa2_img": ("IMAGE",),
                "ipa1_mask": ("MASK",),
                "ipa2_mask": ("MASK",),
                "revision1_img": ("IMAGE",),
                "revision2_img": ("IMAGE",),
                "inpaint_model": ("MODEL",),
            }
        }

    def get_imagemask(self,generation_img=None,generation_mask=None,ipa1_img=None,ipa2_img=None,ipa1_mask=None,ipa2_mask=None,revision1_img=None,revision2_img=None,inpaint_model=None,):
        
        return (generation_img,generation_mask,ipa1_img,ipa2_img,ipa1_mask,ipa2_mask,revision1_img,revision2_img,inpaint_model,)

```
