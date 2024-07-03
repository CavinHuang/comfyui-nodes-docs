
# Documentation
- Class name: PFG
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PFG节点旨在通过对输入条件向量施加学习到的转换来增强生成模型中的条件过程。它利用预训练模型从输入图像计算特征，然后将这些特征缩放并与原始条件向量组合，以产生更好地指导生成过程的修改后的条件向量。

# Input types
## Required
- positive
    - 代表所需生成输出属性或内容的条件向量。它在引导生成模型朝着符合指定正面条件的输出方向发展中起着至关重要的作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 代表不希望出现的属性或内容的条件向量。用于引导生成模型避免生成具有这些负面条件的输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- pfg_scale
    - PFG特征向量的缩放因子，允许调整其对条件过程的影响。此参数可微调PFG修改后的特征对最终生成输出的影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- image
    - 用于使用PFG模型提取特征的输入图像。这些提取的特征随后用于修改条件向量，增强模型生成所需输出的能力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- model_name
    - 用于特征提取的预训练PFG模型的名称。这允许根据输入图像的具体要求或特征灵活选择不同的模型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- conditioning
    - 经过修改的条件向量，包括正面和负面，通过从输入图像提取的特征进行增强，以更好地指导生成过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[List[torch.Tensor, Dict]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PFG:
    def __init__(self):
        download(CURRENT_DIR)
        self.tagger = ViT(3, 448, 9083)
        self.tagger.load_state_dict(torch.load(os.path.join(CURRENT_DIR, TAGGER_FILE)))
        self.tagger.eval()

    # wd-14-taggerの推論関数
    @torch.no_grad()
    def infer(self, img: Image):
        img = preprocess_image(img)
        img = torch.tensor(img).permute(2, 0, 1).unsqueeze(0)
        print("inferencing by torch model.")
        probs = self.tagger(img).squeeze(0)
        return probs
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
                "pfg_scale": ("FLOAT", {
                    "default": 1, 
                    "min": 0, #Minimum value
                    "max": 2, #Maximum value
                    "step": 0.05 #Slider's step
                }),
                "image": ("IMAGE", ), 
                "model_name": (get_file_list(os.path.join(CURRENT_DIR,"models")), ),
            }
        }
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING")
    FUNCTION = "add_pfg"
    CATEGORY = "loaders"

    def add_pfg(self, positive, negative, pfg_scale, image, model_name):
        # load weight
        pfg_weight = torch.load(os.path.join(CURRENT_DIR, "models/" + model_name))
        weight = pfg_weight["pfg_linear.weight"].cpu()
        bias = pfg_weight["pfg_linear.bias"].cpu()
        
        # comfyのload imageはtensorを返すので一度pillowに戻す
        tensor = image*255
        tensor = np.array(tensor, dtype=np.uint8)
        image = Image.fromarray(tensor[0])
        
        # text_embs
        cond = positive[0][0]
        uncond = negative[0][0]

        # tagger特徴量の計算
        pfg_feature = self.infer(image)
        
        # pfgの計算
        pfg_cond = (weight @ pfg_feature + bias) * pfg_scale
        pfg_cond = pfg_cond.reshape(1, -1, cond.shape[2])

        # cond側
        pfg_cond = pfg_cond.to(cond.device, dtype=cond.dtype)
        pfg_cond = pfg_cond.repeat(cond.shape[0], 1, 1)

        # uncond側はゼロベクトルでパディング
        cond = torch.cat([cond, pfg_cond], dim=1)
        pfg_uncond_zero = torch.zeros(uncond.shape[0], pfg_cond.shape[1], uncond.shape[2]).to(uncond.device, dtype=uncond.dtype)
        uncond = torch.cat([uncond, pfg_uncond_zero], dim=1)

        return ([[cond, positive[0][1]]], [[uncond, negative[0][1]]])

```
