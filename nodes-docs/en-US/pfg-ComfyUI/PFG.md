---
tags:
- ModelGuidance
---

# Load PFG node
## Documentation
- Class name: `PFG`
- Category: `loaders`
- Output node: `False`

The PFG node is designed to enhance the conditioning process in generative models by applying a learned transformation to the input conditioning vectors. It leverages a pre-trained model to compute features from an input image, which are then scaled and combined with the original conditioning vectors to produce modified conditioning vectors that better guide the generation process.
## Input types
### Required
- **`positive`**
    - A conditioning vector representing the desired attributes or content in the generated output. It plays a crucial role in guiding the generative model towards producing outputs that align with the specified positive conditions.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`negative`**
    - A conditioning vector representing undesired attributes or content. It is used to steer the generative model away from generating outputs with these negative conditions.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`pfg_scale`**
    - A scaling factor for the PFG feature vector, allowing for adjustment of its influence on the conditioning process. This parameter fine-tunes how strongly the PFG-modified features affect the final generated output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`image`**
    - The input image from which features are extracted using the PFG model. These features are then used to modify the conditioning vectors, enhancing the model's ability to generate desired outputs.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`model_name`**
    - The name of the pre-trained PFG model to use for feature extraction. This allows for flexibility in choosing different models based on the specific requirements or characteristics of the input image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning vectors, both positive and negative, enhanced with features extracted from the input image to better guide the generative process.
    - Python dtype: `List[List[torch.Tensor, Dict]]`
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
