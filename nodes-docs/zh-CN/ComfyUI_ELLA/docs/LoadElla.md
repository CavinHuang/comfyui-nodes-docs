
# Documentation
- Class name: LoadElla
- Category: ella/loaders
- Output node: False

LoadElla节点旨在初始化并加载ELLA模型和指定的T5模型到系统中，为后续的文本编码和处理任务做好准备。它封装了加载模型状态字典和配置模型以在指定设备和数据类型上运行的功能。

# Input types
## Required
- ella_model
    - 指定要加载的ELLA模型的目录路径。这个路径对于定位和初始化ELLA模型以进行后续操作至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- t5_model
    - 指示要与ELLA一起加载的T5模型的目录路径。T5模型对于在ELLA的条件任务之前进行的文本嵌入过程至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- ella
    - 返回一个包含初始化后的ELLA和T5模型的字典，可以用于文本编码和处理任务。
    - Comfy dtype: ELLA
    - Python dtype: Dict[str, torch.nn.Module]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadElla:
    def __init__(self):
        self.device = comfy.model_management.text_encoder_device()
        self.dtype = comfy.model_management.text_encoder_dtype()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "ella_model": (folder_paths.get_filename_list("ella"),),
                              "t5_model": (os.listdir(folder_names_and_paths["t5_model"][0][0]),),
                              }}

    RETURN_TYPES = ("ELLA",)
    FUNCTION = "load_ella"

    CATEGORY = "ella/loaders"

    def load_ella(self, ella_model, t5_model):
        t5_path = os.path.join(models_dir, 't5_model', t5_model)
        ella_path = os.path.join(models_dir, 'ella', ella_model)
        t5_model = T5TextEmbedder(t5_path).to(self.device, self.dtype)
        ella = ELLA().to(self.device, self.dtype)

        ella_state_dict = comfy.utils.load_torch_file(ella_path)

        ella.load_state_dict(ella_state_dict)

        return ({"ELLA": ella, "T5": t5_model}, )

```
