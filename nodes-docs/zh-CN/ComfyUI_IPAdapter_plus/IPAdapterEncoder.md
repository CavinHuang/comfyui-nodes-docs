# Documentation
- Class name: IPAdapterEncoder
- Category: ipadapter/embeds
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterEncoder节点旨在使用预训练的CLIPVision模型处理和编码图像数据。它利用CLIPVision架构的力量生成捕获图像中语义信息的嵌入。该节点能够根据掩码的存在和权重参数处理条件和非条件嵌入，允许微调图像内容对生成的嵌入的影响。

# Input types
## Required
- ipadapter
    - ipadapter参数对于节点的操作至关重要，因为它提供了用于编码图像数据的模型。预期它是一个包含编码过程所需模型信息的字典。此参数的存在确保节点可以访问所需的模型以生成嵌入。
    - Comfy dtype: IPADAPTER
    - Python dtype: Dict[str, Any]
- image
    - image参数是必需的，因为它表示节点将处理的输入数据。预期它是一个图像张量，节点将将其编码为嵌入。图像数据的质量和格式直接影响节点生成有意义的嵌入的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- weight
    - 权重参数允许调整图像内容对生成的嵌入的影响。它是一个浮点数，当不等于1时，可以缩放嵌入以强调或淡化图像数据的某些方面。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- mask
    - 可选的掩码参数可以在编码之前用于对图像数据应用空间掩码。这对于集中节点的注意力在图像的特定区域或从编码过程中排除图像的不相关部分可能很有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- clip_vision
    - clip_vision参数是一个可选模型，可以提供给节点用于编码图像数据。如果没有提供，节点将使用ipadapter参数中指定的模型。这允许在不同的编码任务中使用不同的CLIPVision模型。
    - Comfy dtype: CLIP_VISION
    - Python dtype: Any

# Output types
- pos_embed
    - pos_embed输出代表节点生成的条件嵌入。这些嵌入受到图像数据和应用的任何掩码的影响，捕获图像中的语义信息。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
- neg_embed
    - neg_embed输出提供非条件嵌入，这些嵌入是在不考虑图像内容的情况下生成的。这些嵌入可以作为基线或与条件嵌入进行比较的参考点。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterEncoder:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ipadapter': ('IPADAPTER',), 'image': ('IMAGE',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1.0, 'max': 3.0, 'step': 0.01})}, 'optional': {'mask': ('MASK',), 'clip_vision': ('CLIP_VISION',)}}
    RETURN_TYPES = ('EMBEDS', 'EMBEDS')
    RETURN_NAMES = ('pos_embed', 'neg_embed')
    FUNCTION = 'encode'
    CATEGORY = 'ipadapter/embeds'

    def encode(self, ipadapter, image, weight, mask=None, clip_vision=None):
        if 'ipadapter' in ipadapter:
            ipadapter_model = ipadapter['ipadapter']['model']
            clip_vision = clip_vision if clip_vision is not None else ipadapter['clipvision']['model']
        else:
            ipadapter_model = ipadapter
            clip_vision = clip_vision
        if clip_vision is None:
            raise Exception('Missing CLIPVision model.')
        is_plus = 'proj.3.weight' in ipadapter_model['image_proj'] or 'latents' in ipadapter_model['image_proj'] or 'perceiver_resampler.proj_in.weight' in ipadapter_model['image_proj']
        if mask is not None and mask.shape[1:3] != torch.Size([224, 224]):
            mask = mask.unsqueeze(1)
            transforms = T.Compose([T.CenterCrop(min(mask.shape[2], mask.shape[3])), T.Resize((224, 224), interpolation=T.InterpolationMode.BICUBIC, antialias=True)])
            mask = transforms(mask).squeeze(1)
        img_cond_embeds = encode_image_masked(clip_vision, image, mask)
        if is_plus:
            img_cond_embeds = img_cond_embeds.penultimate_hidden_states
            img_uncond_embeds = encode_image_masked(clip_vision, torch.zeros([1, 224, 224, 3])).penultimate_hidden_states
        else:
            img_cond_embeds = img_cond_embeds.image_embeds
            img_uncond_embeds = torch.zeros_like(img_cond_embeds)
        if weight != 1:
            img_cond_embeds = img_cond_embeds * weight
        return (img_cond_embeds, img_uncond_embeds)
```