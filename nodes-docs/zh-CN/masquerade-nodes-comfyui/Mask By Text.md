# Documentation
- Class name: ClipSegNode
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

ClipSegNode 类旨在根据提供的文本提示自动从输入图像生成掩码。它利用预训练模型理解文本描述并将其应用于视觉内容，创建一个隔离图像中描述主题的分段掩码。

# Input types
## Required
- image
    - 输入图像是节点操作的主要数据源。它是将生成掩码的视觉内容。图像的质量和分辨率直接影响生成的掩码的准确性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- prompt
    - 文本提示是指导节点在图像中识别用于掩码的主题的描述性输入。它对于模型在分割过程中理解要关注的内容至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- precision
    - 精度参数决定了掩码生成的阈值。它是一个浮点值，决定了节点在决定哪些像素属于掩码时应有多严格。
    - Comfy dtype: FLOAT
    - Python dtype: float
- normalize
    - normalize 参数指示是否应将结果掩码标准化到 0 到 1 之间的范围。在某些需要一致掩码强度的应用中，标准化可能会很有用。
    - Comfy dtype: COMBO['no', 'yes']
    - Python dtype: Literal['no', 'yes']
## Optional
- negative_prompt
    - 负面提示是一个可选输入，它通过指示应从分割中排除的内容来帮助细化掩码。它通过向模型提供额外的上下文来提高掩码的精度。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- thresholded_mask
    - 阈值掩码是节点的主要输出，代表基于提供的文本提示对图像进行二进制分割。它是需要主题隔离以进行进一步处理的应用程序的关键组成部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- raw_mask
    - 原始掩码输出在应用任何阈值之前提供了分割掩码的连续值表示。它对于需要更精细理解分割的应用程序可能有用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ClipSegNode:
    """
        Automatically calculates a mask based on the text prompt
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'prompt': ('STRING', {'multiline': True}), 'negative_prompt': ('STRING', {'multiline': True}), 'precision': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'normalize': (['no', 'yes'],)}}
    RETURN_TYPES = ('IMAGE', 'IMAGE')
    RETURN_NAMES = ('thresholded_mask', 'raw_mask')
    FUNCTION = 'get_mask'
    CATEGORY = 'Masquerade Nodes'

    def get_mask(self, image, prompt, negative_prompt, precision, normalize):
        model = self.load_model()
        image = tensor2rgb(image)
        (B, H, W, _) = image.shape
        used_dim = max(W, H)
        transform = transforms.Compose([transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]), transforms.Resize((used_dim, used_dim), antialias=True)])
        img = transform(image.permute(0, 3, 1, 2))
        prompts = prompt.split(DELIMITER)
        negative_prompts = negative_prompt.split(DELIMITER) if negative_prompt != '' else []
        with torch.no_grad():
            dup_prompts = [item for item in prompts for _ in range(B)]
            preds = model(img.repeat(len(prompts), 1, 1, 1), dup_prompts)[0]
            dup_neg_prompts = [item for item in negative_prompts for _ in range(B)]
            negative_preds = model(img.repeat(len(negative_prompts), 1, 1, 1), dup_neg_prompts)[0] if len(negative_prompts) > 0 else None
        preds = torch.nn.functional.interpolate(preds, size=(H, W), mode='nearest')
        preds = torch.sigmoid(preds)
        preds = preds.reshape(len(prompts), B, H, W)
        mask = torch.max(preds, dim=0).values
        if len(negative_prompts) > 0:
            negative_preds = torch.nn.functional.interpolate(negative_preds, size=(H, W), mode='nearest')
            negative_preds = torch.sigmoid(negative_preds)
            negative_preds = negative_preds.reshape(len(negative_prompts), B, H, W)
            mask_neg = torch.max(negative_preds, dim=0).values
            mask = torch.min(mask, 1.0 - mask_neg)
        if normalize == 'yes':
            mask_min = torch.min(mask)
            mask_max = torch.max(mask)
            mask_range = mask_max - mask_min
            mask = (mask - mask_min) / mask_range
        thresholded = torch.where(mask >= precision, 1.0, 0.0)
        return (thresholded.to(device=image.device), mask.to(device=image.device))

    def load_model(self):
        global cached_clipseg_model
        if cached_clipseg_model == None:
            ensure_package('clipseg', 'clipseg@git+https://github.com/timojl/clipseg.git@bbc86cfbb7e6a47fb6dae47ba01d3e1c2d6158b0')
            from clipseg.clipseg import CLIPDensePredT
            model = CLIPDensePredT(version='ViT-B/16', reduce_dim=64, complex_trans_conv=True)
            model.eval()
            d64_file = self.download_and_cache('rd64-uni-refined.pth', 'https://owncloud.gwdg.de/index.php/s/ioHbRzFx6th32hn/download?path=%2F&files=rd64-uni-refined.pth')
            d16_file = self.download_and_cache('rd16-uni.pth', 'https://owncloud.gwdg.de/index.php/s/ioHbRzFx6th32hn/download?path=%2F&files=rd16-uni.pth')
            device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
            model.load_state_dict(torch.load(d64_file, map_location=device), strict=False)
            model = model.eval().to(device=device)
            cached_clipseg_model = model
        return cached_clipseg_model

    def download_and_cache(self, cache_name, url):
        cache_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'download_cache')
        os.makedirs(cache_dir, exist_ok=True)
        file_name = os.path.join(cache_dir, cache_name)
        if not os.path.exists(file_name):
            print(f'Downloading and caching file: {cache_name}')
            with open(file_name, 'wb') as file:
                import requests
                r = requests.get(url, stream=True)
                r.raise_for_status()
                for block in r.iter_content(4096):
                    file.write(block)
            print('Finished downloading.')
        return file_name
```