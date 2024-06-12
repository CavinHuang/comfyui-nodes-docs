# CreateAudioMask (Deprecated)
## Documentation
- Class name: `CreateAudioMask`
- Category: `KJNodes/deprecated`
- Output node: `False`

The CreateAudioMask node is designed to generate visual masks from audio data. It utilizes the audio's spectrogram to create circular masks based on the amplitude of the audio frames, allowing for dynamic visual representations that correspond to audio intensity.
## Input types
### Required
- **`invert`**
    - A boolean flag that, when true, inverts the color of the masks, offering a visual contrast option.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`frames`**
    - Specifies the number of frames to generate masks for, affecting the batch size and the number of output masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`scale`**
    - A scaling factor for the mask's size, allowing for adjustment of the visual representation's intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`audio_path`**
    - The file path to the audio data used for generating masks, central to determining the audio's spectrogram.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`width`**
    - Determines the width of the generated masks, directly influencing the dimensions of the output images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Sets the height of the generated masks, directly influencing the dimensions of the output images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated visual masks as tensors, suitable for dynamic visual representations that correspond to audio intensity.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CreateAudioMask:
    def __init__(self):
        try:
            import librosa
            self.librosa = librosa
        except ImportError:
            print("Can not import librosa. Install it with 'pip install librosa'")
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "createaudiomask"
    CATEGORY = "KJNodes/deprecated"

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "invert": ("BOOLEAN", {"default": False}),
                 "frames": ("INT", {"default": 16,"min": 1, "max": 255, "step": 1}),
                 "scale": ("FLOAT", {"default": 0.5,"min": 0.0, "max": 2.0, "step": 0.01}),
                 "audio_path": ("STRING", {"default": "audio.wav"}),
                 "width": ("INT", {"default": 256,"min": 16, "max": 4096, "step": 1}),
                 "height": ("INT", {"default": 256,"min": 16, "max": 4096, "step": 1}),
        },
    } 

    def createaudiomask(self, frames, width, height, invert, audio_path, scale):
             # Define the number of images in the batch
        batch_size = frames
        out = []
        masks = []
        if audio_path == "audio.wav": #I don't know why relative path won't work otherwise...
            audio_path = os.path.join(script_directory, audio_path)
        audio, sr = self.librosa.load(audio_path)
        spectrogram = np.abs(self.librosa.stft(audio))
        
        for i in range(batch_size):
           image = Image.new("RGB", (width, height), "black")
           draw = ImageDraw.Draw(image)
           frame = spectrogram[:, i]
           circle_radius = int(height * np.mean(frame))
           circle_radius *= scale
           circle_center = (width // 2, height // 2)  # Calculate the center of the image

           draw.ellipse([(circle_center[0] - circle_radius, circle_center[1] - circle_radius),
                      (circle_center[0] + circle_radius, circle_center[1] + circle_radius)],
                      fill='white')
             
           image = np.array(image).astype(np.float32) / 255.0
           image = torch.from_numpy(image)[None,]
           mask = image[:, :, :, 0] 
           masks.append(mask)
           out.append(image)

        if invert:
            return (1.0 - torch.cat(out, dim=0),)
        return (torch.cat(out, dim=0),torch.cat(masks, dim=0),)

```
