# Documentation
- Class name: MiDaS_Depth_Approx
- Category: WAS Suite/Image/AI
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `midas_approx` 负责使用 MiDaS 模型来估算图像的深度。它处理输入图像以预测深度图，这在需要理解场景空间结构的各种计算机视觉任务中非常有用。该方法设计灵活，允许用户指定是使用 CPU 还是 GPU，选择 MiDaS 模型的类型，并选择是否对特定应用反转深度。

# Input types
## Required
- image
    - 输入图像参数对于节点的操作至关重要，因为它是节点处理以生成深度近似的主要数据。输入图像的质量和分辨率直接影响生成的深度图的准确性和细节。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- use_cpu
    - 'use_cpu' 参数决定节点是否应该使用 CPU 进行处理。这对于没有 GPU 的系统或者用户希望为其他任务节省 GPU 资源时非常重要。
    - Comfy dtype: COMBO['false', 'true']
    - Python dtype: str
- midas_type
    - 'midas_type' 参数允许用户选择不同的 MiDaS 模型架构。根据应用的具体需求，选择可以影响准确性和处理速度之间的平衡。
    - Comfy dtype: COMBO['DPT_Large', 'DPT_Hybrid']
    - Python dtype: str
- invert_depth
    - 'invert_depth' 参数提供了一个选项来反转模型预测的深度值。在需要更高的深度值来表示更近的物体的场景中，这可能很有用，这与标准的深度图约定相反。
    - Comfy dtype: COMBO['false', 'true']
    - Python dtype: str
- midas_model
    - 可选的 'midas_model' 参数允许使用预加载的 MiDaS 模型，避免了在节点本身内加载模型的需要。这可以简化处理流程，特别是当重复使用相同的模型时。
    - Comfy dtype: MIDAS_MODEL
    - Python dtype: Tuple[torch.nn.Module, Callable]

# Output types
- images
    - 输出的 'images' 参数代表节点生成的深度近似图像。这些图像对于依赖于理解输入图像中场景空间维度的下游任务至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class MiDaS_Depth_Approx:

    def __init__(self):
        self.midas_dir = os.path.join(MODELS_DIR, 'midas')

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'use_cpu': (['false', 'true'],), 'midas_type': (['DPT_Large', 'DPT_Hybrid'],), 'invert_depth': (['false', 'true'],)}, 'optional': {'midas_model': ('MIDAS_MODEL',)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'midas_approx'
    CATEGORY = 'WAS Suite/Image/AI'

    def midas_approx(self, image, use_cpu, midas_type, invert_depth, midas_model=None):
        global MIDAS_INSTALLED
        if not MIDAS_INSTALLED:
            self.install_midas()
        import cv2 as cv
        if midas_model:
            midas = midas_model[0]
            transform = midas_model[1]
            device = torch.device('cuda') if torch.cuda.is_available() and use_cpu == 'false' else torch.device('cpu')
            cstr(f'MiDaS is using device: {device}').msg.print()
            midas.to(device).eval()
        else:
            if midas_model == 'DPT_Large':
                model_name = 'dpt_large_384.pt'
            elif midas_model == 'DPT_Hybrid':
                model_name = 'dpt_hybrid_384.pt'
            else:
                model_name = 'dpt_large_384.pt'
            model_path = os.path.join(self.midas_dir, 'checkpoints' + os.sep + model_name)
            torch.hub.set_dir(self.midas_dir)
            if os.path.exists(model_path):
                cstr(f'Loading MiDaS Model from `{model_path}`').msg.print()
                midas_type = model_path
            else:
                cstr('Downloading and loading MiDaS Model...').msg.print()
            midas = torch.hub.load('intel-isl/MiDaS', midas_type, trust_repo=True)
            cstr(f'MiDaS is using device: {device}').msg.print()
            midas.to(device).eval()
            midas_transforms = torch.hub.load('intel-isl/MiDaS', 'transforms')
            transform = midas_transforms.dpt_transform
        tensor_images = []
        for (i, img) in enumerate(image):
            img = np.array(tensor2pil(img))
            img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
            input_batch = transform(img).to(device)
            cstr(f'Approximating depth for image {i + 1}/{len(image)}').msg.print()
            with torch.no_grad():
                prediction = midas(input_batch)
                prediction = torch.nn.functional.interpolate(prediction.unsqueeze(1), size=img.shape[:2], mode='bicubic', align_corners=False).squeeze()
            min_val = torch.min(prediction)
            max_val = torch.max(prediction)
            prediction = (prediction - min_val) / (max_val - min_val)
            prediction = (prediction * 255).clamp(0, 255).round().cpu().numpy().astype(np.uint8)
            depth = Image.fromarray(prediction)
            if invert_depth == 'true':
                depth = ImageOps.invert(depth)
            tensor_images.append(pil2tensor(depth.convert('RGB')))
        tensor_images = torch.cat(tensor_images, dim=0)
        if not midas_model:
            del midas, device, midas_transforms
        del midas, transform, img, input_batch, prediction
        return (tensor_images,)

    def install_midas(self):
        global MIDAS_INSTALLED
        if 'timm' not in packages():
            install_package('timm')
        MIDAS_INSTALLED = True
```