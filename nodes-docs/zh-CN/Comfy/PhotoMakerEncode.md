# Documentation
- Class name: PhotoMakerEncode
- Category: _for_testing/photomaker
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PhotoMakerEncode节点旨在使用文本、clip特征和图像的组合对输入图像应用photomaker效果。它处理输入以生成可用于进一步图像操作任务的条件输出。

# Input types
## Required
- photomaker
    - photomaker参数对于应用photomaker效果至关重要。预期它是一个预训练模型或可以相应处理图像的兼容对象。
    - Comfy dtype: PHOTOMAKER
    - Python dtype: torch.nn.Module
- image
    - image参数代表节点将处理的输入图像。这是一个关键输入，因为photomaker效果直接应用于此图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- clip
    - clip参数用于将文本标记化并编码成photomaker可以用于生成条件输出的格式。
    - Comfy dtype: CLIP
    - Python dtype: Callable
- text
    - text参数提供了一个描述性输入，指导photomaker将所需的效果应用于图像。它是一个可以包含动态提示的多行字符串。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- CONDITIONING
    - CONDITIONING输出是节点操作的关键结果。它封装了用于指导后续图像操作过程的编码表示。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[torch.Tensor, Dict[str, torch.Tensor]]

# Usage tips
- Infra type: GPU

# Source code
```
class PhotoMakerEncode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'photomaker': ('PHOTOMAKER',), 'image': ('IMAGE',), 'clip': ('CLIP',), 'text': ('STRING', {'multiline': True, 'dynamicPrompts': True, 'default': 'photograph of photomaker'})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'apply_photomaker'
    CATEGORY = '_for_testing/photomaker'

    def apply_photomaker(self, photomaker, image, clip, text):
        special_token = 'photomaker'
        pixel_values = comfy.clip_vision.clip_preprocess(image.to(photomaker.load_device)).float()
        try:
            index = text.split(' ').index(special_token) + 1
        except ValueError:
            index = -1
        tokens = clip.tokenize(text, return_word_ids=True)
        out_tokens = {}
        for k in tokens:
            out_tokens[k] = []
            for t in tokens[k]:
                f = list(filter(lambda x: x[2] != index, t))
                while len(f) < len(t):
                    f.append(t[-1])
                out_tokens[k].append(f)
        (cond, pooled) = clip.encode_from_tokens(out_tokens, return_pooled=True)
        if index > 0:
            token_index = index - 1
            num_id_images = 1
            class_tokens_mask = [True if token_index <= i < token_index + num_id_images else False for i in range(77)]
            out = photomaker(id_pixel_values=pixel_values.unsqueeze(0), prompt_embeds=cond.to(photomaker.load_device), class_tokens_mask=torch.tensor(class_tokens_mask, dtype=torch.bool, device=photomaker.load_device).unsqueeze(0))
        else:
            out = cond
        return ([[out, {'pooled_output': pooled}]],)
```