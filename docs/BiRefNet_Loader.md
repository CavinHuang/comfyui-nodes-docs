# Documentation  
- Class name: BiRefNet_Loader  
- Category: BiRefNet🌟  
- Output node: False  
- Repo Ref: https://github.com/moon7star9/ComfyUI_BiRefNet_Universal

BiRefNet_Loader节点用于加载BiRefNet模型，这是一个专门用于图像分割和背景移除的深度学习模型。该节点支持多个预训练模型版本，可以根据不同的使用场景选择合适的模型。节点会自动处理模型的下载和加载，支持本地缓存，所下载的模型皆在models/BiRefNet文件夹下。

# Input types  
## Required  
- model_version  
    - 'model_version'参数允许用户选择要加载的BiRefNet模型版本。不同版本针对不同的使用场景和分辨率进行了优化，包括标准版本、高分辨率版本、轻量级版本等，名称与huggingface上的模型仓库相对应。选择建议：带HR字样的都是以2048*2048图像进行推理，因此边缘分辨率更高，通用抠图优先选择BiRefNet_HR比较高清，BiRefNet检测主体可能更好；有lite字样为轻量化模型，其中lite 2K模型更适合抠2k横屏图像；如果输入的图像尺寸较小，通用模型效果差的话，可以试试512x512模型；有matting字样的更加适合抠透明物体、纱、网、毛发等；有portrait字样的更适合抠人像；如果主体定位结果差，建议选择从DIS5K开始的几个模型，这些模型是以训练数据集命名的，偏二值化抠图，因此边缘没有很好的过渡，可以后续继续添加vitmatte等算法进一步处理。
    - Comfy dtype: COMBO  
    - Python dtype: str  
- device  
    - 'device'参数指定模型运行的硬件设备。可以设置为"auto"让系统自动选择最适合的设备，或手动指定特定设备（如"cuda"、"cpu"、"mps"等）。  
    - Comfy dtype: COMBO  
    - Python dtype: str  

# Output types  
- BIREFNET_MODEL  
    - 输出加载好的BiRefNet模型实例，包含模型本身、分辨率设置、设备信息和精度配置等。这个输出可以直接连接到BiRefNet_Remove_Background节点使用。  
    - Comfy dtype: BIREFNET_MODEL  
    - Python dtype: dict  

# Usage tips  
- Infra type: GPU/CPU  
- 首次使用时会自动下载模型文件并缓存到本地  
- 推荐使用GPU运行以获得更好的性能  
- 当选择"auto"设备时，节点会自动检测并使用可用的最佳硬件  
- 在CUDA设备上会自动使用半精度(FP16)以优化性能和内存使用  

# Source code  
```python  
class BiRefNet_Loader:  
    def __init__(self):  
        self.loaded_model = None  
        
    @classmethod  
    def INPUT_TYPES(cls):  
        return {  
            "required": {  
                "model_version": (list(MODEL_VERSIONS.keys()), {"default": "BiRefNet_HR"}),  
                "device": (["auto", "cuda", "cpu", "mps", "xpu", "meta"], {"default": "auto"})  
            }  
        }  

    RETURN_TYPES = ("BIREFNET_MODEL",)  
    RETURN_NAMES = ("model",)  
    FUNCTION = "load_model"  
    CATEGORY = "BiRefNet🌟"  

    

    def load_model(self, model_version, device):  
        device = get_device_by_name(device)  
        model_name, resolution = MODEL_VERSIONS[model_version]  
        local_model_path = get_model_path(model_name)  
        
        # 首先尝试加载本地模型  
        try:  
            if os.path.exists(local_model_path):  
                print(f"\033[92mLoading local model from: {local_model_path}\033[0m")  
                model = AutoModelForImageSegmentation.from_pretrained(  
                    local_model_path,  
                    trust_remote_code=True  
                )  
            else:  
                print(f"\033[93mLocal model not found, downloading from HuggingFace: {model_name}\033[0m")  
                model = AutoModelForImageSegmentation.from_pretrained(  
                    f"ZhengPeng7/{model_name}",  
                    trust_remote_code=True,  
                    cache_dir=local_model_path  
                )  
        except Exception as e:  
            print(f"\033[91mError loading local model: {str(e)}\033[0m")  
            print("\033[93mFallback to downloading from HuggingFace\033[0m")  
            try:  
                model = AutoModelForImageSegmentation.from_pretrained(  
                    f"ZhengPeng7/{model_name}",  
                    trust_remote_code=True,  
                    cache_dir=local_model_path  
                )  
            except Exception as download_error:  
                raise RuntimeError(f"Failed to load model both locally and from HuggingFace: {str(download_error)}")  

        model.to(device)  
        model.eval()  
        if device == "cuda":  
            model.half()  

        return ({  
            "model": model,  
            "resolution": resolution,  
            "device": device,  
            "half_precision": (device == "cuda")  
        },)  
