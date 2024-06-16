# Documentation
- Class name: LoadPSD
- Category: 😺dzNodes/LayerUtility/SystemIO
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

加载PSD格式文件，并导出图层。 注意这个节点需要安装psd_tools依赖包，如果安装psd_tool中出现ModuleNotFoundError: No module named 'docopt'错误，请下载[docopt的whl](https://www.piwheels.org/project/docopt/)手动安装。

# Input types

## Required

- image
    - 这里列出了ComfyUI/input下的*.psd文件，之前加载过的psd图片可以从这里选择。
    - Comfy dtype: FILE
    - 支持上传 PSD 文件。

- file_path
    - psd文件的完整路径以及文件名。
    - Comfy dtype: STRING
    - Python dtype: str

- include_hidden_layer
    - 是否包含隐藏图层。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- find_layer_by
    - 查找图层的方法，可选择按图层索引编号或者图层名称查找。图层组被作为一个图层对待。
    - 可选值: ["layer_index", "layer_name"]
    - Comfy dtype: STRING
    - Python dtype: str

- layer_index
    - 图层索引编号，0是最下面的图层，依次递增。如果include_hidden_layer设置为false，隐藏的图层不计入。设为-1则输出最上层的图层。
    - Comfy dtype: INT
    - Python dtype: int

- layer_name
    - 图层名称。注意大小写和标点符号必须完全匹配。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types

- flat_image
    - 平面图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- layer_image
    - 图层图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- all_layers
    - 所有图层。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class LoadPSD(LoadImage):
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(
            os.path.join(input_dir, f)) and f.endswith(".psd")]
        fine_layer_method = ["layer_index", "layer_name"]
        return {"required":{
                    "image": (sorted(files), {"image_upload": True}),
                    "file_path": ("STRING", {"default": ""}),
                    "include_hidden_layer": ("BOOLEAN", {"default": False}),
                    "find_layer_by": (fine_layer_method,),
                    "layer_index": ("INT", {"default": 0, "min": -1, "max": 999, "step": 1}),
                    "layer_name": ("STRING", {"default": ""}),
                    },
                "optional": {
                    }
                }


    RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE",)
    RETURN_NAMES = ("flat_image", "layer_image", "all_layers",)
    FUNCTION = "load_psd"
    CATEGORY = '😺dzNodes/LayerUtility/SystemIO'

    def load_psd(self, image, file_path, include_hidden_layer, layer_index, find_layer_by, layer_name,):

        from psd_tools import PSDImage
        from psd_tools.api.layers import Layer

        NODE_NAME = 'LoadPSD'
        number_of_layers = 1
        layer_image = []
        all_layers = []
        if file_path == "":
            psd_file_path = folder_paths.get_annotated_filepath(image)
        else:
            psd_file_path = folder_paths.get_annotated_filepath(file_path)
        flat_image = Image.open(psd_file_path).convert("RGB")
        width, height = flat_image.size

        if image.endswith(".psd"):
            from psd_tools import PSDImage
            from psd_tools.api.layers import Layer
            log(f"{NODE_NAME} -> Loading PSD file: {psd_file_path}")
            psd_image = PSDImage.open(psd_file_path)
            layers = []
            for layer in psd_image:
                if include_hidden_layer:
                    if not layer.is_visible():
                        layer.visible = True
                    layers.append(layer)
                else:
                    if layer.is_visible():
                        layers.append(layer)

            number_of_layers = len(layers)
            for i in range(number_of_layers):
                layer_canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
                layer_canvas.paste(layers[i].composite(), layers[i].bbox)
                all_layers.append(pil2tensor(layer_canvas))
                if find_layer_by == "layer_name":
                    if layers[i].name == layer_name:
                        layer_image.append(pil2tensor(layer_canvas))
                        log(f"{NODE_NAME} -> Layer {i} : {layer.name} found.")
                elif find_layer_by == "layer_index":
                    if i == layer_index:
                        layer_image.append(pil2tensor(layer_canvas))
                        log(f"{NODE_NAME} -> Layer {i} : {layer.name} found.")

            text = "Layer Not Found!"
            font_file = list(FONT_DICT.values())[0]
            empty_layer_image = generate_text_image(flat_image.width, flat_image.height, text, font_file, font_color="#F01000")
            if layer_image == []:
                if layer_index == -1:
                    layer_image.append(all_layers[-1])
                elif find_layer_by == "layer_name":
                    log(f'{NODE_NAME} -> Layer "{layer_name}" not found, top layer will be output.', message_type="warning")
                elif find_layer_by == "layer_index":
                    log(f'{NODE_NAME} -> Layer index {layer_index} not found, top layer will be output.', message_type="warning")
                layer_image.append(pil2tensor(empty_layer_image))
        else:
            layer_image.append(pil2tensor(flat_image))
            all_layers.append(pil2tensor(flat_image))

        return (torch.cat([pil2tensor(flat_image),], dim=0), torch.cat(layer_image, dim=0), torch.cat(all_layers, dim=0),)
```