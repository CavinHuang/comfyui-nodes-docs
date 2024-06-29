# Documentation
- Class name: ToDetailerPipeSDXL
- Category: Image Processing
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ToDetailerPipeSDXL 节点是图像处理流水线中的一个中间环节，专门设计用于增强图像的细节水平。它通过利用先进的模型和技术来细化输入图像的视觉元素来实现这一点。该节点的主要目标是提高图像的清晰度和锐度，使其更适合于详细分析或展示。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它定义了节点用于处理图像的核心算法框架。它直接影响图像细化的质量和结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip 参数对于提供节点增强图像细节所需的上下文信息至关重要。它在确保输出图像的上下文相关性方面起着重要作用。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- vae
    - vae 参数代表变分自编码器，节点使用它从输入数据生成详细的图像。这是节点能够产生高质量详细图像的关键组件。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- positive
    - positive 参数作为节点的指导，用于集中增强图像中的特定特征。它对于将节点的细化工作引向所需的视觉方面很重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - negative 参数有助于节点避免增强图像中不需要的特征。它在确保节点的细化过程符合用户的期望方面至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- refiner_model
    - refiner_model 参数指定了一个用于进一步细化节点生成的详细图像的附加模型。这对于在最终输出中实现更高级别的细节至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- refiner_clip
    - refiner_clip 参数为 refiner 模型提供额外的上下文信息，以便更好地细化图像。它确保细化过程具有上下文意识并且准确。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- refiner_positive
    - refiner_positive 参数指导 refiner 模型在细化过程中集中增强所需的特征。这对于在最终图像中实现预期的细节水平至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- refiner_negative
    - refiner_negative 参数有助于 refiner 模型避免在图像中细化不需要的特征。它确保最终图像满足用户的要求，没有不需要的细节。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- bbox_detector
    - bbox_detector 参数用于识别和定位图像内的兴趣区域。它对于节点知道在哪里集中其细化工作很重要。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: Callable
- wildcard
    - wildcard 参数允许动态输入文本，可以根据用户定义的条件定制节点的行为。它在节点处理图像的方式上提供了灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- Select to add LoRA
    - 选择添加 LoRA 参数使用户能够选择特定的低秩适应技术，以增强模型生成详细图像的性能。
    - Comfy dtype: COMBO['Select the LoRA to add to the text', folder_paths.get_filename_list('loras')]
    - Python dtype: str
- Select to add Wildcard
    - 选择添加 Wildcard 参数为用户提供了一个选项，可以在其输入中包含一个通配符，这可以用来引入节点处理中的可变性。
    - Comfy dtype: COMBO['Select the Wildcard to add to the text']
    - Python dtype: str

# Output types
- detailed_image
    - detailed_image 输出参数代表节点操作的最终产品，即具有增强细节的图像。它是节点所有处理和细化工作的成果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ToDetailerPipeSDXL(ToDetailerPipe):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'vae': ('VAE',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'refiner_model': ('MODEL',), 'refiner_clip': ('CLIP',), 'refiner_positive': ('CONDITIONING',), 'refiner_negative': ('CONDITIONING',), 'bbox_detector': ('BBOX_DETECTOR',), 'wildcard': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'Select to add LoRA': (['Select the LoRA to add to the text'] + folder_paths.get_filename_list('loras'),), 'Select to add Wildcard': (['Select the Wildcard to add to the text'],)}, 'optional': {'sam_model_opt': ('SAM_MODEL',), 'segm_detector_opt': ('SEGM_DETECTOR',), 'detailer_hook': ('DETAILER_HOOK',)}}
```