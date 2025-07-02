
import React, { useState } from 'react';
import { Calendar, User, BarChart3, Clock, Award, Bell, Mail, Phone, MapPin, Building, Users, Target, TrendingUp, CheckCircle, Briefcase } from 'lucide-react';

// Static data - moved outside component to prevent re-creation
const USER_DATA = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@techcorp.com',
  phone: '+91 9876543210',
  address: '123 Tech Street, Udaipur, Rajasthan',
  designation: 'Senior Software Developer',
  department: 'Engineering',
  employeeId: 'TC001',
  manager: 'Priya Singh',
  joinDate: '2022-01-15',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  overallScore: 87,
  completedProjects: 15,
  currentProjects: 3,
  teamSize: 5
};

const PERFORMANCE_DATA = [
  { month: 'Jan', score: 82, projects: 2, tasks: 25 },
  { month: 'Feb', score: 85, projects: 2, tasks: 28 },
  { month: 'Mar', score: 78, projects: 1, tasks: 22 },
  { month: 'Apr', score: 88, projects: 3, tasks: 32 },
  { month: 'May', score: 91, projects: 2, tasks: 30 },
  { month: 'Jun', score: 87, projects: 2, tasks: 27 }
];

const LEAVE_DATA = [
  { date: '2025-07-15', type: 'Annual Leave', status: 'approved', days: 2 },
  { date: '2025-07-22', type: 'Sick Leave', status: 'pending', days: 1 },
  { date: '2025-08-05', type: 'Annual Leave', status: 'approved', days: 3 },
  { date: '2025-08-19', type: 'Personal Leave', status: 'approved', days: 1 },
  { date: '2025-09-02', type: 'Annual Leave', status: 'planned', days: 5 }
];

const TASKS = [
  { id: 1, title: 'API Integration for Mobile App', priority: 'high', deadline: '2025-07-08', progress: 85 },
  { id: 2, title: 'Database Schema Optimization', priority: 'medium', deadline: '2025-07-12', progress: 60 },
  { id: 3, title: 'Code Review - Payment Module', priority: 'high', deadline: '2025-07-06', progress: 95 }
];

const NOTIFICATIONS = [
  { id: 1, message: 'Team standup in 30 minutes', time: '30 min ago' },
  { id: 2, message: 'Leave request approved', time: '2 hours ago' },
  { id: 3, message: 'New task assigned: Code Review', time: '4 hours ago' },
  { id: 4, message: 'Company all-hands meeting tomorrow', time: '1 day ago' }
];

// Pre-calculated stats
const LEAVE_STATS = {
  totalAllowed: 24,
  used: 6,
  remaining: 17,
  pending: 1
};

const AVG_SCORE = 85;
const TOTAL_TASKS = 164;
const TOTAL_PROJECTS = 12;

// CSS Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e5e7eb'
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logo: {
    backgroundColor: '#2563eb',
    color: 'white',
    borderRadius: '8px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    margin: 0
  },
  headerSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  notificationButton: {
    position: 'relative',
    padding: '8px',
    color: '#9ca3af',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  notificationBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: '12px',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #2563eb'
  },
  userName: {
    color: '#111827',
    fontWeight: '500',
    margin: 0
  },
  notificationsDropdown: {
    position: 'absolute',
    right: '16px',
    top: '80px',
    width: '320px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    zIndex: 50
  },
  notificationsHeader: {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb'
  },
  notificationsTitle: {
    fontWeight: '600',
    color: '#111827',
    margin: 0
  },
  notificationsList: {
    maxHeight: '256px',
    overflowY: 'auto'
  },
  notificationItem: {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer'
  },
  notificationMessage: {
    fontSize: '14px',
    color: '#111827',
    margin: 0
  },
  notificationTime: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
    margin: 0
  },
  mainContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 16px'
  },
  navigation: {
    marginBottom: '32px'
  },
  navTabs: {
    display: 'flex',
    gap: '32px'
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'all 0.2s'
  },
  tabButtonActive: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8'
  },
  tabButtonInactive: {
    color: '#6b7280'
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  welcomeCard: {
    background: 'linear-gradient(to right, #2563eb, #9333ea)',
    borderRadius: '8px',
    padding: '24px',
    color: 'white'
  },
  welcomeContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  welcomeTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '8px',
    margin: 0
  },
  welcomeSubtitle: {
    color: '#bfdbfe',
    margin: 0
  },
  welcomeScore: {
    textAlign: 'right'
  },
  welcomeScoreValue: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: 0
  },
  welcomeScoreLabel: {
    color: '#bfdbfe',
    margin: 0
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  statCardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  statCardText: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    margin: 0
  },
  statCardValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    marginTop: '4px',
    margin: 0
  },
  statCardIcon: {
    padding: '12px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  chartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#111827'
  },
  chart: {
    height: '256px',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    gap: '8px'
  },
  chartBar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  chartBarContainer: {
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px 4px 0 0',
    position: 'relative',
    overflow: 'hidden'
  },
  chartBarFill: {
    background: 'linear-gradient(to top, #3b82f6, #60a5fa)',
    borderRadius: '4px 4px 0 0',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    paddingBottom: '4px'
  },
  chartLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '8px'
  },
  tasksCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  taskCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: 'white'
  },
  taskHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  taskTitle: {
    fontWeight: '500',
    color: '#111827',
    margin: 0
  },
  taskPriority: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  taskPriorityHigh: {
    backgroundColor: '#fee2e2',
    color: '#991b1b'
  },
  taskPriorityMedium: {
    backgroundColor: '#fef3c7',
    color: '#92400e'
  },
  taskPriorityLow: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  taskMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px'
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    height: '8px',
    overflow: 'hidden'
  },
  progressBarFill: {
    backgroundColor: '#2563eb',
    height: '8px',
    borderRadius: '4px'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '24px'
  },
  profileAvatar: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #2563eb'
  },
  profileName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '4px'
  },
  profileDesignation: {
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: '4px'
  },
  profileId: {
    fontSize: '14px',
    color: '#6b7280'
  },
  profileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px'
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  profileSectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827'
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  profileInfoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  profileInfoText: {
    color: '#6b7280'
  },
  leaveCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: 'white'
  },
  leaveCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leaveCardTitle: {
    fontWeight: '500',
    color: '#111827',
    margin: 0
  },
  leaveCardMeta: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  leaveStatus: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  leaveStatusApproved: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  leaveStatusPending: {
    backgroundColor: '#fef3c7',
    color: '#92400e'
  },
  leaveStatusPlanned: {
    backgroundColor: '#dbeafe',
    color: '#1e40af'
  }
};

// Reusable components
const StatCard = ({ title, value, icon: Icon, iconBg }) => (
  <div style={styles.statCard}>
    <div style={styles.statCardContent}>
      <div>
        <p style={styles.statCardText}>{title}</p>
        <p style={styles.statCardValue}>{value}</p>
      </div>
      <div style={{...styles.statCardIcon, ...iconBg}}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const ProgressBar = ({ percentage }) => (
  <div style={styles.progressBar}>
    <div style={{...styles.progressBarFill, width: `${percentage}%`}} />
  </div>
);

const TaskCard = ({ task }) => (
  <div style={styles.taskCard}>
    <div style={styles.taskHeader}>
      <h4 style={styles.taskTitle}>{task.title}</h4>
      <span style={{
        ...styles.taskPriority,
        ...(task.priority === 'high' ? styles.taskPriorityHigh :
           task.priority === 'medium' ? styles.taskPriorityMedium :
           styles.taskPriorityLow)
      }}>
        {task.priority}
      </span>
    </div>
    <div style={styles.taskMeta}>
      <span>Due: {task.deadline}</span>
      <span>Progress: {task.progress}%</span>
    </div>
    <ProgressBar percentage={task.progress} />
  </div>
);

const TabButton = ({ active, onClick, icon: Icon, children }) => (
  <button
    onClick={onClick}
    style={{
      ...styles.tabButton,
      ...(active ? styles.tabButtonActive : styles.tabButtonInactive)
    }}
    onMouseOver={(e) => {
      if (!active) {
        e.target.style.color = '#60a5fa';
      }
    }}
    onMouseOut={(e) => {
      if (!active) {
        e.target.style.color = '#6b7280';
      }
    }}
  >
    <Icon size={16} />
    {children}
  </button>
);

const PersonalEmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderDashboard = () => (
    <div style={styles.contentSection}>
      {/* Welcome Section */}
      <div style={styles.welcomeCard}>
        <div style={styles.welcomeContent}>
          <div>
            <h1 style={styles.welcomeTitle}>Welcome back, {USER_DATA.name}!</h1>
            <p style={styles.welcomeSubtitle}>Today is a great day to make progress on your goals</p>
          </div>
          <div style={styles.welcomeScore}>
            <div style={styles.welcomeScoreValue}>{USER_DATA.overallScore}%</div>
            <div style={styles.welcomeScoreLabel}>Overall Score</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsGrid}>
        <StatCard 
          title="Active Tasks" 
          value={TASKS.filter(t => t.progress < 100).length} 
          icon={CheckCircle} 
          iconBg={{backgroundColor: '#dbeafe', color: '#2563eb'}}
        />
        <StatCard 
          title="Leave Balance" 
          value={LEAVE_STATS.remaining} 
          icon={Calendar} 
          iconBg={{backgroundColor: '#dcfce7', color: '#16a34a'}}
        />
        <StatCard 
          title="Projects" 
          value={USER_DATA.currentProjects} 
          icon={Briefcase} 
          iconBg={{backgroundColor: '#f3e8ff', color: '#9333ea'}}
        />
        <StatCard 
          title="Avg Performance" 
          value={`${AVG_SCORE}%`} 
          icon={TrendingUp} 
          iconBg={{backgroundColor: '#fed7aa', color: '#ea580c'}}
        />
      </div>

      {/* Performance Chart */}
      <div style={styles.chartCard}>
        <h3 style={styles.chartTitle}>
          <BarChart3 size={20} />
          Performance Trends
        </h3>
        <div style={styles.chart}>
          {PERFORMANCE_DATA.map((month, index) => (
            <div key={index} style={styles.chartBar}>
              <div style={styles.chartBarContainer}>
                <div 
                  style={{
                    ...styles.chartBarFill,
                    height: `${(month.score / 100) * 200}px`
                  }}
                >
                  {month.score}%
                </div>
              </div>
              <p style={styles.chartLabel}>{month.month}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Tasks */}
      <div style={styles.tasksCard}>
        <h3 style={styles.chartTitle}>
          <Target size={20} />
          Current Tasks
        </h3>
        <div style={styles.tasksList}>
          {TASKS.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div style={styles.contentSection}>
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <img src={USER_DATA.photo} alt={USER_DATA.name} style={styles.profileAvatar} />
          <div>
            <h2 style={styles.profileName}>{USER_DATA.name}</h2>
            <p style={styles.profileDesignation}>{USER_DATA.designation}</p>
            <p style={styles.profileId}>Employee ID: {USER_DATA.employeeId}</p>
          </div>
        </div>

        <div style={styles.profileGrid}>
          <div style={styles.profileSection}>
            <h3 style={styles.profileSectionTitle}>Contact Information</h3>
            <div style={styles.profileInfo}>
              <div style={styles.profileInfoItem}>
                <Mail size={20} color="#2563eb" />
                <span style={styles.profileInfoText}>{USER_DATA.email}</span>
              </div>
              <div style={styles.profileInfoItem}>
                <Phone size={20} color="#16a34a" />
                <span style={styles.profileInfoText}>{USER_DATA.phone}</span>
              </div>
              <div style={styles.profileInfoItem}>
                <MapPin size={20} color="#9333ea" />
                <span style={styles.profileInfoText}>{USER_DATA.address}</span>
              </div>
            </div>
          </div>

          <div style={styles.profileSection}>
            <h3 style={styles.profileSectionTitle}>Work Information</h3>
            <div style={styles.profileInfo}>
              <div style={styles.profileInfoItem}>
                <Building size={20} color="#2563eb" />
                <span style={styles.profileInfoText}>{USER_DATA.department}</span>
              </div>
              <div style={styles.profileInfoItem}>
                <Users size={20} color="#16a34a" />
                <span style={styles.profileInfoText}>Manager: {USER_DATA.manager}</span>
              </div>
              <div style={styles.profileInfoItem}>
                <Calendar size={20} color="#9333ea" />
                <span style={styles.profileInfoText}>Joined: {USER_DATA.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <StatCard 
          title="Completed Projects" 
          value={USER_DATA.completedProjects} 
          icon={Award} 
          iconBg={{backgroundColor: '#dbeafe', color: '#2563eb'}}
        />
        <StatCard 
          title="Team Members" 
          value={USER_DATA.teamSize} 
          icon={Users} 
          iconBg={{backgroundColor: '#dcfce7', color: '#16a34a'}}
        />
        <StatCard 
          title="Total Tasks" 
          value={TOTAL_TASKS} 
          icon={TrendingUp} 
          iconBg={{backgroundColor: '#f3e8ff', color: '#9333ea'}}
        />
      </div>
    </div>
  );

  const renderLeave = () => (
    <div style={styles.contentSection}>
      <div style={styles.statsGrid}>
        <StatCard 
          title="Total Allowed" 
          value={LEAVE_STATS.totalAllowed} 
          icon={Calendar} 
          iconBg={{backgroundColor: '#f3f4f6', color: '#111827'}}
        />
        <StatCard 
          title="Used" 
          value={LEAVE_STATS.used} 
          icon={Calendar} 
          iconBg={{backgroundColor: '#fee2e2', color: '#dc2626'}}
        />
        <StatCard 
          title="Remaining" 
          value={LEAVE_STATS.remaining} 
          icon={Calendar} 
          iconBg={{backgroundColor: '#dcfce7', color: '#16a34a'}}
        />
        <StatCard 
          title="Pending" 
          value={LEAVE_STATS.pending} 
          icon={Calendar} 
          iconBg={{backgroundColor: '#fef3c7', color: '#d97706'}}
        />
      </div>

      <div style={styles.chartCard}>
        <h3 style={styles.chartTitle}>Leave Calendar</h3>
        <div style={styles.tasksList}>
          {LEAVE_DATA.map((leave, index) => (
            <div key={index} style={styles.leaveCard}>
              <div style={styles.leaveCardHeader}>
                <div>
                  <h4 style={styles.leaveCardTitle}>{leave.type}</h4>
                  <p style={styles.leaveCardMeta}>{leave.date} • {leave.days} day(s)</p>
                </div>
                <span style={{
                  ...styles.leaveStatus,
                  ...(leave.status === 'approved' ? styles.leaveStatusApproved :
                     leave.status === 'pending' ? styles.leaveStatusPending :
                     styles.leaveStatusPlanned)
                }}>
                  {leave.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>
              <User size={24} />
            </div>
            <div>
              <h1 style={styles.headerTitle}>My Dashboard</h1>
              <p style={styles.headerSubtitle}>TechCorp Solutions</p>
            </div>
          </div>
          
          <div style={styles.headerRight}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              style={styles.notificationButton}
              onMouseOver={(e) => e.target.style.color = '#60a5fa'}
              onMouseOut={(e) => e.target.style.color = '#9ca3af'}
            >
              <Bell size={24} />
              <span style={styles.notificationBadge}>
                {NOTIFICATIONS.length}
              </span>
            </button>
            
            <div style={styles.userInfo}>
              <img src={USER_DATA.photo} alt={USER_DATA.name} style={styles.avatar} />
              <span style={styles.userName}>{USER_DATA.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div style={styles.notificationsDropdown}>
          <div style={styles.notificationsHeader}>
            <h3 style={styles.notificationsTitle}>Notifications</h3>
          </div>
          <div style={styles.notificationsList}>
            {NOTIFICATIONS.map(notification => (
              <div 
                key={notification.id} 
                style={styles.notificationItem}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
              >
                <p style={styles.notificationMessage}>{notification.message}</p>
                <p style={styles.notificationTime}>{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={BarChart3}>Dashboard</TabButton>
            <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={User}>Profile</TabButton>
            <TabButton active={activeTab === 'leave'} onClick={() => setActiveTab('leave')} icon={Calendar}>Leave Calendar</TabButton>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'leave' && renderLeave()}
      </div>
    </div>
  );
};

export default PersonalEmployeeDashboard;