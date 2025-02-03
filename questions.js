// questions.js

// Assign the questionBank to the global window object
window.questionBank = [
  // Easy Difficulty (1–15)
  {
    question: "What is a traceroute?",
    type: "multiple_choice",
    options: [
      "A network diagnostic tool that maps the path data takes to reach a destination.",
      "A software used to increase internet speed.",
      "A method to encrypt network traffic.",
      "A tool to block unwanted websites."
    ],
    correctAnswerIndex: 0,
    explanation: "Traceroute is a network diagnostic tool that maps the path data takes from one device to another over a network, helping identify connectivity issues."
  },
  {
    question: "Fiber optic cables can transmit both digital and analog signals.",
    type: "true_false",
    options: [
      "True",
      "False"
    ],
    correctAnswerIndex: 0,
    explanation: "Fiber optic cables can transmit both digital and analog signals using light pulses."
  },
  {
    question: "The color of the fiber optic cable’s jacket indicates its data transmission speed.",
    type: "true_false",
    options: [
      "True",
      "False"
    ],
    correctAnswerIndex: 1,
    explanation: "The color of the fiber optic cable’s jacket does not indicate data transmission speed; it’s usually for identification purposes like distinguishing between different types or grades of cables."
  },
  {
    question: "Which steps should you take if the ONT’s optical light is off or the alarm light is red?",
    type: "check_all_that_apply",
    options: [
      "Check for tight bends/kinks in the fiber line.",
      "Verify the fiber connector is fully seated in the ONT.",
      "Reboot the customer’s WiFi router.",
      "Inspect the fiber connector for dirt or damage."
    ],
    correctAnswerIndices: [0, 1, 3],
    explanation: "A red alarm light or no optical light indicates no signal from the provider. This is often due to a disconnected/dirty connector, or physical damage (e.g., bends)."
  },
  {
    question: "Fiber optic cables are immune to electromagnetic interference.",
    type: "true_false",
    options: [
      "True",
      "False"
    ],
    correctAnswerIndex: 0,
    explanation: "Fiber optic cables use light to transmit data, making them immune to electromagnetic interference."
  },
  {
    question: "Fiber optic cables are more flexible and easier to install than copper cables.",
    type: "true_false",
    options: [
      "True",
      "False"
    ],
    correctAnswerIndex: 1,
    explanation: "Fiber optic cables are generally less flexible and more delicate than copper cables, making them more challenging to install."
  },
  {
    question: "What is a MAC address and why is it important?",
    type: "multiple_choice",
    options: [
      "A type of IP address that dynamically assigns network locations to devices, allowing them to connect to different networks seamlessly without manual configuration.",
      "A protocol used to encrypt data transmissions, ensuring secure communication between devices on a network by preventing unauthorized access to the information being sent.",
      "A unique identifier assigned to every network device, acting like a \"name tag\" that allows data packets to reach the correct device on a local network, essentially ensuring that data is sent to the intended recipient within a network.",
      "A software license key embedded in network hardware, required to activate and authenticate devices for use on a secure network infrastructure."
    ],
    correctAnswerIndex: 2,
    explanation: "A MAC (Media Access Control) address is a unique hardware identifier for network devices, used for identifying devices on a local network and managing network access."
  },
  {
    question: "How does fiber transmit voice, data, and video?",
    type: "multiple_choice",
    options: [
      "By converting the signals into electrical pulses that travel through copper conductors.",
      "By converting the signals into light pulses that travel through optical fibers.",
      "By modulating radio frequency waves that are sent along the fiber.",
      "By converting the signals into analog signals that are amplified and transmitted."
    ],
    correctAnswerIndex: 1,
    explanation: "Fiber optic technology works by converting voice, data, and video signals into light pulses that travel through glass or plastic optical fibers, enabling high-speed and long-distance transmission with minimal signal loss."
  },
  {
    question: "Which of the following are benefits of using fiber optic cables over traditional copper cables?",
    type: "check_all_that_apply",
    options: [
      "Higher bandwidth capacity.",
      "Immunity to electromagnetic interference.",
      "Lower installation costs.",
      "Longer transmission distances without signal loss."
    ],
    correctAnswerIndices: [0, 1, 3],
    explanation: "Fiber optic cables offer higher bandwidth, immunity to electromagnetic interference, and can transmit signals over longer distances without significant signal loss compared to copper cables. However, they are generally more expensive to install."
  },
  {
    question: "Fiber optic cables are more resistant to environmental factors like moisture and temperature changes compared to copper cables.",
    type: "true_false",
    options: [
      "True",
      "False"
    ],
    correctAnswerIndex: 0,
    explanation: "Fiber optic cables are less susceptible to environmental factors such as moisture and temperature fluctuations, providing more reliable performance in various conditions."
  },
  {
    question: "Which of the following are common causes of fiber optic connector contamination?",
    type: "check_all_that_apply",
    options: [
      "Fingerprints and oils from handling",
      "Dust and airborne particles",
      "Excessive bending of the fiber",
      "Improper cleaning techniques"
    ],
    correctAnswerIndices: [0, 1, 3],
    explanation: "Fiber optic connectors can become contaminated through fingerprints and oils from handling, dust and airborne particles settling on the connector ends, and improper cleaning techniques that leave residues or scratches. Excessive bending of the fiber can cause physical damage but is not a direct cause of connector contamination."
  },
  {
    question: "Single-mode fiber optic cables are optimized for long-distance, high-bandwidth communication.",
    type: "true_false",
    options: [
      "True",
      "False"
    ],
    correctAnswerIndex: 0,
    explanation: "Single-mode fiber optic cables have a small core diameter that permits only one mode of light to propagate. This design minimizes dispersion and attenuation, making them ideal for long-distance, high-bandwidth applications."
  },
  {
    question: "Which of the following are common causes of fiber optic cable signal degradation?",
    type: "check_all_that_apply",
    options: [
      "Excessive bending or kinking of the cable.",
      "Using high-quality connectors.",
      "Splicing cables improperly.",
      "Exposure to extreme seasonal temperatures."
    ],
    correctAnswerIndices: [0, 2],
    explanation: "Excessive bending, improper splicing, and exposure to extreme temperatures can cause signal degradation in fiber optic cables."
  },
  {
    question: "What is the purpose of using a Visual Fault Locator (VFL)?",
    type: "multiple_choice",
    options: [
      "To measure the optical power in a fiber.",
      "To visually identify breaks, bends, or defects in a fiber optic cable.",
      "To convert optical signals to electrical signals.",
      "To splice two fiber optic cables together."
    ],
    correctAnswerIndex: 1,
    explanation: "A Fiber Optic Visual Fault Locator (VFL) emits a visible red laser light that travels through the fiber optic cable. It allows technicians to visually identify breaks, bends, or defects by observing where the light escapes or is disrupted. This tool is essential for quick troubleshooting and locating faults in fiber installations. The other options describe different tools or functionalities."
  },
  {
    question: "A customer complains that their WiFi works well in the living room but is weak in their backyard. The router is placed near the TV, next to a large fish tank. What is the best recommendation?",
    type: "multiple_choice",
    options: [
      "Move the router away from the fish tank and closer to a window facing the backyard.",
      "Upgrade the customer’s internet plan to a higher speed.",
      "Use a wired Ethernet connection instead of WiFi.",
      "Disable the router’s 5 GHz band and use 2.4 GHz exclusively."
    ],
    correctAnswerIndex: 0,
    explanation: "A large fish tank can block or weaken WiFi signals. Moving the router away from it and closer to a window improves outdoor signal strength."
  },
  
  // Medium Difficulty (16–35)
  {
    question: "How do you run a traceroute on Mac?",
    type: "check_all_that_apply",
    options: [
      "Open Terminal and type ‘traceroute [destination]’.",
      "Open Terminal and type ‘sudo mtr -n [destination]’.",
      "Open Safari and navigate to a traceroute website.",
      "Network Utility and select Trace Route."
    ],
    correctAnswerIndices: [0, 1],
    explanation: "On Mac, you run a traceroute by opening Terminal and typing the traceroute or mtr command followed by the destination address. Note that mtr is not installed on Mac by default but it is available on our Macbooks."
  },
  {
    question: "What does NDP stand for, and what is its role in a fiber optic network?",
    type: "multiple_choice",
    options: [
      "Network Data Processing; the method of handling data packets within a network.",
      "Neighbor Discovery Protocol; a set of processes used in IPv6 networks to discover other devices on the network.",
      "Network Demarcation Point; it serves as the physical point where the service provider’s network ends and the customer’s internal network begins.",
      "Network Distribution Point; a node in a network where data is distributed to various devices."
    ],
    correctAnswerIndex: 2,
    explanation: "In the context of fiber optic networks, NDP stands for Network Demarcation Point. This is the designated physical location where the responsibility for the network transitions from the service provider to the customer."
  },
  {
    question: "How do you run a traceroute on Windows?",
    type: "multiple_choice",
    options: [
      "Open Command Prompt and ‘type tracert [destination]’.",
      "Open PowerShell and type ‘trace-route [destination]’.",
      "Open the Run window and type ‘tracert [destination]’.",
      "Use the Network and Sharing Center to perform a traceroute."
    ],
    correctAnswerIndex: 0,
    explanation: "In Windows, the tracert command can be used in Command Prompt or the Run Window to perform a traceroute."
  },
  {
    question: "How do you run a traceroute on Chrome OS?",
    type: "multiple_choice",
    options: [
      "Open the terminal by pressing and type ‘tracepath [destination]’.",
      "Use the Chrome browser’s developer tools.",
      "Install a third-party trace route extension.",
      "Use the Settings menu to perform a traceroute."
    ],
    correctAnswerIndex: 0,
    explanation: "On Chrome OS, the Terminal (Crosh shell) allows you to run tracepath to perform a traceroute."
  },
  {
    question: "How do you check for packet loss on Windows?",
    type: "multiple_choice",
    options: [
      "Use Command Prompt to run ‘ping -n [number of tests] [IP address]’ and analyze the loss statistics.",
      "Open Device Manager and check network adapters.",
      "Use the Control Panel’s Network and Sharing Center.",
      "Open PowerShell and run Get-PacketLoss."
    ],
    correctAnswerIndex: 0,
    explanation: "On Windows, using the ping command with a specified IP address can help determine packet loss by analyzing the output statistics. You should run at least 50 pings to get an accurate result, i.e., (ping -n 50 1.1.1.1)."
  },
  {
    question: "How do you check for packet loss on Mac?",
    type: "multiple_choice",
    options: [
      "Use Terminal to run ‘ping [IP Address] -c [number of tests]’ and review the summary.",
      "Use the Activity Monitor to observe network traffic.",
      "Open Safari and use a packet loss testing website.",
      "Use the Network Utility app and select Packet Loss."
    ],
    correctAnswerIndex: 0,
    explanation: "On Mac, the ping command in Terminal with a count option (-c) allows you to test packet loss by sending a specified number of packets. You should run at least 50 pings to get an accurate result, i.e., (ping 1.1.1.1 -c 50)."
  },
  {
    question: "How do you check for packet loss on Chrome OS?",
    type: "multiple_choice",
    options: [
      "Install a network monitoring app from the Chrome Web Store.",
      "Use the Chrome browser’s network diagnostics tool.",
      "Open a web browser and visit an IP lookup website.",
      "Open the Terminal (Crosh shell) and run ‘ping [IP Address] -c [number of tests]’."
    ],
    correctAnswerIndex: 3,
    explanation: "On Chrome OS, you can check for packet loss by opening the Crosh shell and using the ping command with the count option. You should run at least 50 pings to get an accurate result, i.e., (ping 1.1.1.1 -c 50)."
  },
  {
    question: "How do you find the Internal (Private) IP on Windows?",
    type: "check_all_that_apply",
    options: [
      "Open Command Prompt and run ‘nslookup myip.opendns.com resolver1.opendns.com’.",
      "Open Command Prompt and run ‘ipconfig’.",
      "Select Start > Settings > Network & internet > Wi-Fi and then select the Wi-Fi network you're connected to. Under Properties, look for your IP address listed next to IPv4 address.",
      "Open a web browser and visit an IP lookup website."
    ],
    correctAnswerIndices: [1, 2],
    explanation: "The ipconfig command in Command Prompt displays the computer’s Private IP address and network configuration details. You can also look up the Private IP address through the network settings in Windows."
  },
  {
    question: "How do you find the External (Public) IP on Windows?",
    type: "check_all_that_apply",
    options: [
      "Open Command Prompt and run ‘nslookup myip.opendns.com resolver1.opendns.com’.",
      "Open Command Prompt and run ‘ipconfig’.",
      "Select Start > Settings > Network & internet > Wi-Fi and then select the Wi-Fi network you're connected to. Under Properties, look for your IP address listed next to IPv4 address.",
      "Open a web browser and visit an IP lookup website."
    ],
    correctAnswerIndices: [0, 3],
    explanation: "The nslookup command in Command Prompt displays the computer’s Public IP address. You can also look up the Public IP address through an IP lookup website."
  },
  {
    question: "How do you find the Internal (Private) IP on Mac?",
    type: "check_all_that_apply",
    options: [
      "Open Terminal and run ‘ipconfig getifaddr en0’.",
      "Use the Activity Monitor to view network traffic.",
      "Go to System Settings > Network > Details > TCP/IP.",
      "Open Safari and visit an IP lookup website."
    ],
    correctAnswerIndices: [0, 2],
    explanation: "On Mac, ipconfig getifaddr en0 in Terminal displays the Internal IP Address but only for a wifi connection. If connected over ethernet, you must use ipconfig getifaddr en1. Alternatively, it can be viewed in System Preferences under Network settings."
  },
  {
    question: "How do you find the External (Public) IP on Mac?",
    type: "check_all_that_apply",
    options: [
      "Open Terminal and run ‘curl ifconfig.me’.",
      "Use the Activity Monitor to view network traffic.",
      "Go to System Settings > Network > Details > TCP/IP.",
      "Open a web browser and visit an IP lookup website."
    ],
    correctAnswerIndices: [0, 3],
    explanation: "On Mac, curl ifconfig.me in Terminal displays your public IP address. Alternatively, you can use a web browser to look up the IP on a website."
  },
  {
    question: "How do you find the Internal (Private) IP on Chrome OS?",
    type: "check_all_that_apply",
    options: [
      "Open Crosh shell (Terminal) and run ‘ip addr show’.",
      "Go to the settings menu > Network Tab > Click on the network connection and scroll down to see the IP address.",
      "chrome://system in your Chrome browser, press Ctrl+f and search for ifconfig in the search box, click Expand and locate the IP address.",
      "Use the Settings menu to run ‘findip’."
    ],
    correctAnswerIndices: [0, 1, 2],
    explanation: "On Chrome OS, you can find the IP address by opening the Crosh shell and running ip addr show, or by checking the network settings accessed from the system tray or by going to the system info in the Chrome browser with chrome://system."
  },
  {
    question: "How do you find the External (Public) IP on Chrome OS?",
    type: "multiple_choice",
    options: [
      "Open Crosh shell and run ifconfig or check the network settings in the system tray.",
      "Use the Chrome browser’s developer tools.",
      "Open a web browser and visit an IP lookup website.",
      "Use the Settings menu to run findip."
    ],
    correctAnswerIndex: 2,
    explanation: "On Chrome OS, you can find the External (Public) IP address by using the web browser to visit an IP lookup site."
  },
  {
    question: "Which of the following are types of fiber optic cables?",
    type: "check_all_that_apply",
    options: [
      "Single-mode fiber.",
      "Multi-mode fiber.",
      "Twisted pair fiber.",
      "Plastic optical fiber."
    ],
    correctAnswerIndices: [0, 1, 3],
    explanation: "Single-mode fiber, multi-mode fiber, and plastic optical fiber are types of fiber optic cables. Twisted pair is a type of copper cabling."
  },
  {
    question: "How do you open the Terminal on Mac?",
    type: "check_all_that_apply",
    options: [
      "Open Finder, navigate to Applications > Utilities, and double-click Terminal.",
      "Press Command + Space to open Spotlight, type “Terminal,” and press Enter.",
      "Open Safari and navigate to a Terminal website.",
      "Use Launchpad, search for Terminal, and click the icon."
    ],
    correctAnswerIndices: [0, 1, 3],
    explanation: "On Mac, the Terminal application can be opened through Finder by navigating to Applications > Utilities, via Spotlight search by pressing Command + Space, typing “Terminal,” and pressing Enter, or by using Launchpad to search and open Terminal. Opening Safari to a Terminal website is not a valid method, and there is no default keyboard shortcut like Control + Option + T to open Terminal."
  },
  {
    question: "How do you open the Command Prompt on Windows?",
    type: "check_all_that_apply",
    options: [
      "Press Windows + R to open the Run dialog, type “cmd,” and press Enter.",
      "Click Start, type “Command Prompt” in the search bar, and select it.",
      "Open File Explorer, navigate to C:\\Windows\\System32, and double-click cmd.exe.",
      "Use the Task Manager to launch Command Prompt."
    ],
    correctAnswerIndices: [0, 1, 2],
    explanation: "On Windows, Command Prompt can be opened by using the Run dialog (Windows + R, then typing “cmd”), by searching for “Command Prompt” in the Start menu, or by navigating to the System32 folder in File Explorer and running cmd.exe. Option D is incorrect because Task Manager does not provide a direct way to launch Command Prompt."
  },
  {
    question: "How do you open the Terminal on a Chromebook?",
    type: "check_all_that_apply",
    options: [
      "Press Ctrl + Alt + T to open the Crosh shell.",
      "Open the Settings menu, navigate to Advanced > Developers, and launch the Linux Terminal.",
      "Use the Chrome browser and go to chrome://terminal.",
      "Click the Launcher, search for “Terminal,” and open the app."
    ],
    correctAnswerIndices: [0, 1, 3],
    explanation: "On a Chromebook, the Terminal can be opened by pressing Ctrl + Alt + T to access the Crosh shell, enabling Linux (Beta) in Settings and opening the Linux Terminal, or using the Launcher to search and open the Terminal app. Option C is incorrect because chrome://terminal is not a valid URL for accessing the Terminal."
  },
  {
    question: "A customer reports their laptop is slow to connect to websites despite strong WiFi. You discover they have set a manual DNS. What’s your next step?",
    type: "multiple_choice",
    options: [
      "Disable the firewall temporarily to test connection speed.",
      "Clear the DNS cache and set DNS back to automatic.",
      "Replace the Ethernet cable with a higher-speed variant.",
      "Suggest upgrading their internet plan."
    ],
    correctAnswerIndex: 1,
    explanation: "A manually set DNS may be slow or misconfigured. Clearing the DNS cache and setting it to automatic can resolve delays in resolving website addresses."
  },
  {
    question: "What is the purpose of an Optical Time-Domain Reflectometer (OTDR) in fiber optic networks?",
    type: "multiple_choice",
    options: [
      "To measure the light intensity emitted by a fiber optic cable.",
      "To detect faults, splices, and bends by sending light pulses and analyzing reflections.",
      "To convert optical signals to electrical signals for analysis.",
      "To amplify optical signals for long-distance transmission."
    ],
    correctAnswerIndex: 1,
    explanation: "An OTDR sends light pulses down a fiber optic cable and measures the reflected signals to identify and locate faults, splices, bends, and other anomalies within the cable. This helps technicians diagnose issues and ensure the integrity of the fiber optic network. The other options describe different functionalities not related to OTDRs."
  },
  {
    question: "A customer’s laptop won’t connect to WiFi, but other devices in the house are working fine. What steps should you take?",
    type: "check_all_that_apply",
    options: [
      "Check if the laptop is in Airplane Mode.",
      "Restart the router and ONT.",
      "Forget and reconnect to the WiFi network on the laptop.",
      "Update the WiFi driver on the laptop."
    ],
    correctAnswerIndices: [0, 2, 3],
    explanation: "Airplane Mode disables wireless communication. Forgetting and reconnecting to the network can fix connection errors. If the issue persists, outdated drivers could be the cause."
  },
  {
    question: "A customer complains about slow internet speeds despite having a strong signal. What troubleshooting steps should you take?",
    type: "check_all_that_apply",
    options: [
      "Run a speed test over Ethernet to rule out WiFi issues.",
      "Check for devices consuming excessive bandwidth on the network.",
      "Replace the ONT with a higher-speed variant.",
      "Ensure the router’s firmware is up to date."
    ],
    correctAnswerIndices: [0, 1, 3],
    explanation: "Running a speed test over Ethernet isolates network issues from WiFi problems. Excessive bandwidth usage and outdated firmware can also cause slow speeds. Replacing the ONT may not be necessary unless it’s confirmed faulty."
  },
  {
    question: "A customer reports random WiFi disconnections throughout the day. What steps should you take to diagnose the issue?",
    type: "check_all_that_apply",
    options: [
      "Check for firmware updates on the router.",
      "Analyze channel congestion using a WiFi analyzer tool.",
      "Test for loose or damaged fiber connections at the ONT.",
      "Verify if the router is overheating or placed near interference sources."
    ],
    correctAnswerIndices: [0, 1, 3],
    explanation: "Firmware updates can resolve known router bugs. WiFi analyzer tools help identify channel congestion or interference. Overheating or proximity to interference (e.g., microwaves) can also disrupt WiFi. Fiber connection issues would affect all devices, not just WiFi."
  },
  {
    question: "What can the WiFi channel cause problems in a network?",
    type: "multiple_choice",
    options: [
      "Using higher channels always increases security vulnerabilities.",
      "Channel overlap can lead to interference and reduced network performance.",
      "Limited number of channels restricts the number of connected devices.",
      "Channels determine the physical distance a WiFi signal can travel, with higher channels offering longer range."
    ],
    correctAnswerIndex: 1,
    explanation: "WiFi channels can cause problems when channels overlap, leading to interference from neighboring networks and devices operating on the same or adjacent channels. This interference can result in reduced network performance, slower speeds, increased latency, and higher packet loss. Proper channel selection and management are essential to minimize interference and maintain optimal network performance. The other options are incorrect because channel selection does not inherently increase security vulnerabilities, the number of channels does not directly limit connected devices, and higher channels do not necessarily offer longer range."
  },
  {
    question: "Which of the following are drawbacks of 3rd-party WiFi extenders?",
    type: "check_all_that_apply",
    options: [
      "Split SSIDs requiring manual network switching.",
      "Reduced bandwidth due to signal rebroadcasting.",
      "Limited compatibility with modern routers.",
      "Complex setup requiring professional installation."
    ],
    correctAnswerIndices: [0, 1],
    explanation: "Traditional extenders often create separate SSIDs (forcing manual switching) and cut bandwidth by rebroadcasting signals on the same frequency."
  },
  {
    question: "A customer complains about intermittent connectivity. You notice the fiber cable is coiled tightly in the wall behind the ONT. What should you do?",
    type: "multiple_choice",
    options: [
      "Replace the ONT.",
      "Uncoil the cable to meet the minimum bend radius.",
      "Reset the router to factory settings.",
      "Clean the fiber connector with alcohol."
    ],
    correctAnswerIndex: 1,
    explanation: "Tight bends can cause micro-fractures or signal loss in fiber cables. Ensuring the bend radius complies with specifications resolves this."
  },
  
  // Hard Difficulty (41–50)
  {
    question: "An Ethernet cable has four pairs of copper wires. Which pair(s) can be used to deliver Power over Ethernet (PoE)?",
    type: "check_all_that_apply",
    options: [
      "The blue pair (pins 4 and 5) and the brown pair (pins 7 and 8).",
      "The orange pair (pins 1 and 2) and the green pair (pins 3 and 6).",
      "All four pairs can be used in certain PoE standards.",
      "It depends on the PoE standard being used."
    ],
    correctAnswerIndices: [0, 2, 3],
    explanation: "802.3af/at (Type 1 and 2): Typically use the blue pair (pins 4 and 5) and brown pair (pins 7 and 8) in 10/100 Mbps connections (spare pair). 802.3bt (Type 3 and 4): Uses all four pairs for higher power delivery (4-pair powering). The specific pairs used depend on the PoE standard and the device’s power requirements."
  },
  {
    question: "What is the primary difference between Single-Mode Fiber, Multi-Mode Fiber, and Plastic Optical Fiber?",
    type: "multiple_choice",
    options: [
      "Single-Mode Fiber is designed for long-distance communication using a single light path, Multi-Mode Fiber supports multiple light paths for shorter distances, and Plastic Optical Fiber is more flexible and cost-effective for short-range applications.",
      "Single-Mode Fiber uses multiple light paths leading to higher bandwidth, Multi-Mode Fiber uses a single light path for simplicity, and Plastic Optical Fiber is immune to electromagnetic interference.",
      "Single-Mode Fiber is made from plastic, Multi-Mode Fiber is made from glass, and Plastic Optical Fiber is exclusively used in automotive applications.",
      "Single-Mode Fiber is cheaper than Multi-Mode Fiber, Multi-Mode Fiber has higher bandwidth, and Plastic Optical Fiber cannot transmit data over long distances."
    ],
    correctAnswerIndex: 0,
    explanation: "Single-Mode Fiber utilizes a single light path (mode) which allows it to transmit data over longer distances with minimal signal loss and dispersion, making it ideal for telecommunications and long-haul networks. Multi-Mode Fiber supports multiple light paths, which can lead to higher modal dispersion, limiting its effective range to shorter distances such as within buildings or campuses. Plastic Optical Fiber is made from polymer materials, making it more flexible and less expensive, suitable for short-range applications like consumer electronics, automotive networks, and some local area networks (LANs). The other options present inaccuracies, such as incorrect materials, misconceptions about bandwidth and cost, or inappropriate application scenarios."
  },
  {
    question: "What is packet loss and what does it indicate?",
    type: "multiple_choice",
    options: [
      "Packet loss is the increase in packet size to enhance data transmission speed.",
      "Packet loss is the deliberate dropping of packets by firewalls to prevent unauthorized access.",
      "Packet loss refers to the delay in packet delivery due to high network traffic.",
      "Packet loss occurs when data packets fail to reach their destination, indicating potential network issues such as congestion, hardware failures, or poor signal quality."
    ],
    correctAnswerIndex: 3,
    explanation: "Packet loss happens when one or more data packets fail to reach their intended destination, which can be caused by network congestion, faulty hardware, poor signal quality, or other network issues. It can lead to reduced performance, dropped connections, and other communication problems. The other options describe different network concepts or incorrect interpretations of packet loss."
  },
  {
    question: "What is the difference between an Internal (Private) and an External (Public) IP address?",
    type: "multiple_choice",
    options: [
      "An Internal (Private) IP address can be accessed from outside the local network, whereas an External (Public) IP address is only accessible within the local network.",
      "An Internal (Private) IP address is used within a local network and is not routable on the internet, while an External (Public) IP address is assigned by an ISP and is used to identify devices on the internet.",
      "Internal (Private) IP addresses are always static, while External (Public) IP addresses are always dynamic.",
      "There is no difference; Internal and External IP addresses are interchangeable terms."
    ],
    correctAnswerIndex: 1,
    explanation: "Internal (Private) IP addresses are assigned to devices within a local network (e.g., home or office) and are not directly accessible from the internet. External (Public) IP addresses are assigned by an Internet Service Provider (ISP) and are used to identify a network on the internet, allowing communication between devices across the internet. The other options are incorrect as private IPs are not accessible externally, they can be dynamic or static, and they are distinct concepts."
  },
  {
    question: "A customer reports that some websites won’t load on their laptop, but others work fine. What could be the issue?",
    type: "multiple_choice",
    options: [
      "DNS server issues causing resolution problems.",
      "Incorrect date and time settings on the laptop.",
      "Fiber attenuation due to a damaged cable.",
      "Browser cache or cookies causing conflicts."
    ],
    correctAnswerIndex: 0,
    explanation: "DNS server issues can prevent certain websites from loading."
  },
  {
    question: "What are WiFi channels?",
    type: "multiple_choice",
    options: [
      "Specific frequency ranges within the WiFi spectrum used to transmit data between devices.",
      "Physical pathways that WiFi signals follow to reach their destinations.",
      "Security protocols used to encrypt WiFi communications.",
      "Hardware components in a WiFi router that manage signal distribution."
    ],
    correctAnswerIndex: 0,
    explanation: "WiFi channels are specific frequency ranges within the WiFi spectrum (such as the 2.4 GHz or 5 GHz bands) that are used to transmit data between devices. Each channel operates at a different frequency to help reduce interference and manage bandwidth. Understanding and selecting the appropriate WiFi channel is crucial for optimizing network performance and minimizing interference from other wireless devices. The other options describe unrelated concepts: physical pathways, security protocols, and hardware components."
  },
  {
    question: "What does MSAP stand for, and why does clearing the MSAP help with provisioning issues?",
    type: "multiple_choice",
    options: [
      "Managed Service Access Point; clearing it updates firmware to resolve provisioning conflicts.",
      "Master Service Access Protocol; clearing it resets network configurations to default settings.",
      "Multi Signal Access Point; clearing it enhances signal strength for better provisioning.",
      "Multi Service Access Platform; clearing it removes stored device serial numbers in the ONT, allowing new devices to be attached and provisioned."
    ],
    correctAnswerIndex: 3,
    explanation: "MSAP stands for Multi Service Access Platform. The Optical Network Terminal (ONT) can handle only two devices simultaneously. The serial numbers of these devices are stored in the ONT’s cache. When provisioning a new device, the existing serial numbers may prevent additional devices from being connected. Performing an MSAP clear action removes these stored serial numbers from the ONT’s cache, thereby freeing up capacity and allowing new devices to be attached and provisioned successfully."
  },
  {
    question: "Which of the following are benefits of Mesh WiFi systems compared to 3rd-party extenders?",
    type: "check_all_that_apply",
    options: [
      "Dedicated backhaul for communication between extenders.",
      "Reduced bandwidth due to signal rebroadcasting.",
      "Centralized management via a mobile app.",
      "Consistent performance with adaptive routing."
    ],
    correctAnswerIndices: [0, 2, 3],
    explanation: "Mesh systems often use a dedicated backhaul (e.g., a separate radio band) to maintain speed between extenders, offer centralized management, and dynamically route traffic for optimal performance. Traditional extenders typically share bandwidth with connected devices, reducing overall speed."
  },
  {
    question: "Which of the following are benefits of Mesh WiFi systems compared to 3rd-party extenders?",
    type: "check_all_that_apply",
    options: [
      "Dedicated backhaul for communication between extenders.",
      "Reduced bandwidth due to signal rebroadcasting.",
      "Centralized management via a mobile app.",
      "Consistent performance with adaptive routing."
    ],
    correctAnswerIndices: [0, 2, 3],
    explanation: "Mesh systems often use a dedicated backhaul (e.g., a separate radio band) to maintain speed between extenders, offer centralized management, and dynamically route traffic for optimal performance. Traditional extenders typically share bandwidth with connected devices, reducing overall speed."
  },
  {
    question: "A customer reports intermittent internet drops during rainstorms. The ONT’s optical light remains green. Which factors could explain this?",
    type: "check_all_that_apply",
    options: [
      "Water leaking into the NIU.",
      "A corroded Ethernet cable between the ONT and router.",
      "Signal reflection due to a dirty APC connector.",
      "Overloaded GPON during peak weather-related usage."
    ],
    correctAnswerIndices: [0, 1],
    explanation: "Rain can cause water ingress in improperly sealed NIU splices or corroded Ethernet connections in scotch locks. Green ONT light rules out fiber signal issues. GPON congestion isn’t weather-dependent."
  },
  {
    question: "A customer’s smart home devices (e.g., lights, plugs) disconnect when the microwave runs. What is the most likely cause?",
    type: "multiple_choice",
    options: [
      "The ONT’s optical power is too low.",
      "The smart devices use 2.4 GHz WiFi.",
      "The microwave is blocking the fiber signal.",
      "The router’s firmware is outdated."
    ],
    correctAnswerIndex: 1,
    explanation: "Most smart home devices use 2.4 GHz WiFi, which overlaps with microwave frequencies."
  }
];